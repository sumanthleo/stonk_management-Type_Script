import userRoute from './admin/user/unAuth';
import { Router } from 'express';
const router = Router();

/**
 * Total UnAuth Routes
 */
router.use('/user', userRoute);

export default router;
