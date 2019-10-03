const {Router} = require("express");
const Detectors = require('../models/detector');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Новый датчик",
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const detector = new Detectors(req.body.model_detector, req.body.name_detector, req.body.producing_country);
    await detector.save();
    res.redirect('/sensors');
});

module.exports = router;