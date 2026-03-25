// routes/auth.routes.js
import express from 'express';
import { signIn, signUp } from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);

// router.get('/admin', protect, authorize('admin'), (req, res) => {
//     res.send('Admin only');
// });

export default router;
