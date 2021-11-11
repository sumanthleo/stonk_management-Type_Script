import { logger } from '../../utils/logger';
import models from '../../models/index';
import { UserAttributes } from '../../models/users';
import { Request, Response } from 'express';
import { httpStatusCodes } from '../../utils/constants';
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
                status: httpStatusCodes.SUCCESS_CODE,
                message: 'successfully listed',
                data: userData
            });

            return;
        } catch (error: any) {
            logger.error(error);
            res.status(httpStatusCodes.SERVER_ERROR_CODE).json({
                status: httpStatusCodes.SERVER_ERROR_CODE,
                message: typeof error === 'string' ? error : typeof error.message === 'string' ? error.message : 500
            });

            return;
        }
    }
}

export default new User();
