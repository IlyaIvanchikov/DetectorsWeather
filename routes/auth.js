const {Router} = require("express");
// const Detectors = require('../models/detector');
const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login',
    {
        title: "Авторизация",
        isLogin: true
    });
});

module.exports = router;