import Router  from 'express';
// const Detectors = require('../models/detector');
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



export default router;