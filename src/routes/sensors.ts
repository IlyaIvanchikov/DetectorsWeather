import Router  from 'express';
import Detector from '../models/detectors';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import auth from '../middleware/auth';
import { sensorValidators } from '../utils/validators';
import { validationResult } from 'express-validator';
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

router.get('/sensors/edit/:id', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const detector = await Detector.findByPk(req.params.id);
    if (detector !== null) {
    res.render('sensor-edit', {
        title: `Датчик ${detector.location}`,
        layout: 'empty', 
        detector
    })
  }
});

router.get('/sensors/:id', async (req, res) => {
    const detector = await Detector.findByPk(req.params.id);
    if (detector !== null) {
        res.render('sensor', {
            title: `Датчик ${detector.location}`,
            layout: 'empty', 
            detector
        });
    }

})

router.post('/edit', sensorValidators, auth, async (req:any, res:any) => {

    if(!req.body) return res.sendStatus(400);
    const { id } = req.body;

    delete req.body.id;
    const location = req.body.location;
    await Detector.update({location}, { where: {
                           id  }
                           });
    res.redirect('/sensors');
})

router.post('/delete', auth, async (req, res) => {
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