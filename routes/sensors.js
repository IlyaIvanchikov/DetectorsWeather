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

router.get('/:id', async (req, res) => {
    const detector = await Detectors.getById(req.params.id);
    res.render('sensor', {
        title: `Датчик ${detector.name_detector}`,
        layout: 'empty', 
        detector
    });
})

module.exports = router;