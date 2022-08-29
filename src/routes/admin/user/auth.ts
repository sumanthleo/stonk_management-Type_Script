import { Router, IRouter } from 'express';
import user from '../../../controllers/admin/user';
const router: IRouter = Router();

// users table
router.get('/list/:skip/:limit', user.listUsers);
router.put("/user_update/:id", user.update_user)
router.patch("/user_password_update/:id", user.change_password);
router.delete("/delete_user/:id", user.delete_user);

export default router;
