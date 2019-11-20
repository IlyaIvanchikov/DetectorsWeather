import Router  from 'express';
import Detector  from '../models/detector';
// import auth from '../middleware/auth';
// import { sensorValidators } from '../utils/validators';
// import { validationResult } from 'express-validator';

const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Новый датчик",
        isAdd: true
    });
});

router.post('/', async (req:any, res:any) => {
    try {
      Detector.create({
        model_detector: req.body.model_detector,
        name_detector: req.body.name_detector,
        producing_country: req.body.producing_country  
      })
      res.redirect('/sensors');
    }
    catch(e) {
        console.log(e);
    }
});

export default router;