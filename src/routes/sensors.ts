import Router  from 'express';
import Detectors from '../models/detector';
// import auth from '../middleware/auth';
const router = Router();

router.get('/sensors',  async (req, res) => {
    const detector = await Detectors.find();
    res.render('sensors', {
        title: "Датчики",
        isSensors: true,
        detector
    });
});

// router.get('/sensors/edit/:id', auth, async (req, res) => {
//     if (!req.query.allow) {
//         return res.redirect('/');
//     }
//     const detector = await Detectors.findById(req.params.id);
//     res.render('sensor-edit', {
//         title: `Датчик ${detector.name_detector}`,
//         layout: 'empty', 
//         detector
//     })
// });

router.get('/sensors/:id', async (req, res) => {
    const detector = await Detectors.findById(req.params.id);
    res.render('sensor', {
        title: `Датчик ${detector.name_detector}`,
        layout: 'empty', 
        detector
    });
})

// router.post('/edit', auth, async (req, res) => {
//     const {id} = req.body;
//     console.log(id);
//     delete req.body.id;
//     await Detectors.findOneAndUpdate(id, req.body);
//     res.redirect('/sensors');
// })

// router.post('/delete', auth, async (req, res) => {
//     try {
//         await Detectors.deleteOne({_id: req.body.id});
//         res.redirect('/sensors');
//     }
//     catch(e) {
//     console.log(e);
//     }

// })

export default router;