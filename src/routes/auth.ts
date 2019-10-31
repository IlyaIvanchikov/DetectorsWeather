import Router  from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users';
import nodemailer from 'nodemailer';
import { validationResult } from 'express-validator';
import { registerValidators } from '../utils/validators';
import regEmail from '../emails/registration';

const router = Router();
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '8649b9dce8cbd9',
        pass: '48fca78c216ed1'
     }
});

router.get('/auth/login', async (req, res) => {
    res.render('auth/login',
    {
        title: "Авторизация",
        isLogin: true,
        RegisterError: req.flash('RegisterError'),
        LoginError: req.flash('LoginError')
    });
});

router.get('/auth/logout', async (req, res) => {
    req!.session!.destroy(() => {
     res.redirect('/auth/login#login');
    })
});

router.post('/auth/login', async (req, res) => {
    try {
        const {login, password} = req.body;
        const candidate = await User.findOne({ login });
        if (candidate) {
            const areSome = await bcrypt.compare(password, candidate.password);
            if (areSome) {
                req!.session!.user = candidate;
                req!.session!.isAuthenticated = true;
                req!.session!.save(err => {
                   if(err) {
                    throw err;
                   } 
                res.redirect('/');
                });
            }
            else {
                req.flash('LoginError','Ошибка входа, проверь вводимые данные');
                res.redirect('/auth/login#login');
            }
        }   
        else {
            req.flash('LoginError','Ошибка входа, проверь вводимые данные');
            res.redirect('/auth/login#login');
        }
    }
    catch(e) {
        console.log(e);
    }
});

router.post('/auth/register', registerValidators, async (req:any, res:any) => {
    try {
    const {fio, login, email, password, confirm} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('RegisterError', errors.array()[0].msg);
        return res.status(422).redirect('/auth/login#register');
      }
        const passwordBcryptsjs =  await bcrypt.hash(password, 10);
        const user = new User({ fio, login, email, password: passwordBcryptsjs, confirm });
        await user.save();

        res.redirect('/auth/login#login');
        transporter.sendMail(regEmail(email), (err, info) => {
            if(err) {
                console.log(err);
            }
            console.log(info);
        });
      }
    catch(e) {
        console.log(e);
    }
});

router.get('/auth/reset', (req, res) => {
    res.render('auth/reset', {
       title: 'Забыли пароль?',
       error: req.flash('error')
    })
});

export default router;