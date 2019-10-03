const {Router} = require("express");
const Detectors = require('../models/detector');
const router = Router();

router.get('/sensors',  async (req, res) => {
    const detector = await Detectors.allInfo();
    res.render('sensors', {
        title: "Датчики",
        isSensors: true,
        detector
    });
});

router.get('/sensors/edit/:id', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const detector = await Detectors.getById(req.params.id);
    res.render('sensor-edit', {
        title: `Датчик ${detector.name_detector}`,
        layout: 'empty', 
        detector
    })
});

router.get('/sensors/:id', async (req, res) => {
    const detector = await Detectors.getById(req.params.id);
    res.render('sensor', {
        title: `Датчик ${detector.name_detector}`,
        layout: 'empty', 
        detector
    });
})

router.post('/sensors', async (req, res) => {
    await Detectors.update(req.body);
    res.redirect('/sensors');
})
module.exports = router;