import userRoute from './admin/user/auth';
import { Router } from 'express';
const router = Router();

router.use('/user', userRoute);

export default router;
