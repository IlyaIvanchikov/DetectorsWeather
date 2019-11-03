import Router  from 'express';
import auth from '../middleware/auth';
import User from '../models/users';

const router = Router();

router.get('/profile', auth, async (req, res) => {
    res.render('profile', {
        title:  'Profile',
        isProfile: true,
        user: req!.session!.user,
    })
});

router.post('/profile', auth, async (req, res) => {
    try {
        const candidate = await User.findById(req!.session!.user._id);

        //  const toChange = {
        //     //  fio: req.body.fio,
        //  };
         console.log(req.body);
         console.log(req.file);

         if (req.file) {
             // toChange.avatarURL = '';
         }
        // Object.assign(candidate, toChange);
        // await candidate.save();
        res.redirect('/profile');
    }
    catch(e) {
        console.log(e);
    }

});

export default router;