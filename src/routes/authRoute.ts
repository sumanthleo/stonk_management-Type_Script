import userRoute from './admin/user/auth';
import { Router } from 'express';
const router = Router();

/**
 * Total Auth Routes
 */
router.use('/user', userRoute);

export default router;
