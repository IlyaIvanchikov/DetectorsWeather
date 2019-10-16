import Router  from 'express';
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
    req!.session!.isAuthenticated = true;
    res.redirect('/');
});

router.post('/auth/register', async (req, res) => {
    try {
    const {fio, login, email, password, confirm} = req.body;
    const candidate = await User.findOne({ login });
      if (!candidate) {
        const user = new User({
        fio, login, email, password, confirm}
        );
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