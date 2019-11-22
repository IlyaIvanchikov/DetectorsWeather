import Router  from 'express';
import Detector  from '../models/detectors';
import auth from '../middleware/auth';
import { sensorValidators } from '../utils/validators';
import { validationResult } from 'express-validator';

const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: "Новый датчик",
        isAdd: true
    });
});

router.post('/', sensorValidators, auth, async (req:any, res:any) => {
    const error = validationResult(req);

    if(!error.isEmpty()) {
      return res.status(422).render('add', {
        title: "New detector",
        isAdd: true,
        error: error.array()[0].msg,
        data: {
          model_detector: req.body.model_detector,
          name_detector: req.body.name_detector,
          producing_country: req.body.producing_country
        }
      })
    }
    try {
        await Detector.create({
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