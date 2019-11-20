import Router  from 'express';
import Detector from '../models/detector';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
// import auth from '../middleware/auth';
// import { sensorValidators } from '../utils/validators';
// import { validationResult } from 'express-validator';
const router = Router();

router.get('/sensors',  async (req, res) => {
    const detector = await Detector.findAll();
    res.render('sensors', {
        title: "Датчики",
        isSensors: true,
        isDelete: false,
        detector
    });
});

router.get('/sensors/edit/:id', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const detector = await Detector.findByPk(req.params.id);
    if (detector !== null) {
    res.render('sensor-edit', {
        title: `Датчик ${detector.name_detector}`,
        layout: 'empty', 
        detector
    })
  }
});

router.get('/sensors/:id', async (req, res) => {
    const detector = await Detector.findByPk(req.params.id);
    if (detector !== null) {
        res.render('sensor', {
            title: `Датчик ${detector.name_detector}`,
            layout: 'empty', 
            detector
        });
    }

})

router.post('/edit', async (req:any, res:any) => {

    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;

    delete req.body.id;
    const name_detector = req.body.name_detector;
    const producing_country = req.body.producing_country;
    const model_detector = req.body.model_detector;
    await Detector.update({name_detector, 
                           producing_country, 
                           model_detector}, { where: {
                           id  }
                           });
    res.redirect('/sensors');
})

router.post('/delete', async (req, res) => {
    try {
            await Detector.destroy({
                    where: {
                     id: req.body.id}});
            res.redirect('/sensors');
    }
    catch(e) {
    console.log(e);
    }

})

export default router;