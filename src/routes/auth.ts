import Router  from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users';
const router = Router();

router.get('/auth/login', async (req, res) => {
    res.render('auth/login',
    {
        title: "Авторизация",
        isLogin: true
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
                res.redirect('/auth/login#login');
            }
        }   
        else {
            res.redirect('/auth/login#login');
        }
    }
    catch(e) {
        console.log(e);
    }
});

router.post('/auth/register', async (req, res) => {
    try {
    const {fio, login, email, password, confirm} = req.body;
    const candidate = await User.findOne({ login });
      if (!candidate) {
        const passwordBcryptsjs =  await bcrypt.hash(password, 10);
        const user = new User({ fio, login, email, password: passwordBcryptsjs, confirm });
        await user.save();
        res.redirect('/auth/login#login');
      }
      else {
          res.redirect('/auth/login#register');
      }
    }

    catch(e) {
        console.log(e);
    }
})


export default router;