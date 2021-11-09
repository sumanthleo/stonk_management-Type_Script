import { logger } from '../../utils/logger';
import models from '../../models/index';
import { UserAttributes } from '../../models/users';
import { Request, Response } from 'express';

class User {
    constructor() {
        // super();
    }

    /* 
        --------------------------------------------------------------------------------
        Admins functions 
    */

    /**
     * @api {get} /v1/auth/list-user/:skip/:limit (List All Role User)
     * @apiName listUsers
     * @apiGroup AdminUser
     *
     *
     * @apiSuccess {Object} User.
     */
    async listUsers(req: Request, res: Response) {
        logger.info('!!!!!!listUsers function start!!!!!');
        try {
            const userData: UserAttributes = await models.users.findOne({
                where: {
                    _deleted: false
                },
                include: [
                    {
                        model: models.user_roles,
                        as: 'userRole'
                    }
                ]
            });

            res.json({
                status: 200,
                message: 'successfully listed',
                data: userData
            });

            return;
        } catch (error: any) {
            logger.error(error);
            res.status(500).json({
                status: 500,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });

            return;
        }
    }
}

export default new User();
