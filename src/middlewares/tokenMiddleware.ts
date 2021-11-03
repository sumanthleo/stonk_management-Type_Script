import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';
import { TOKEN, httpStatusCodes } from '../utils/constants';

type DecodedType = {
    role: string;
    id: string;
};

export async function tokenHandler(req: Request, res: Response, next: NextFunction) {
    try {
        // matching null if user dont have saved the token in browser in that case it will be string type of null value
        const authorizedTokenString =
            (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers.authorization;

        if (!authorizedTokenString) {
            res.status(httpStatusCodes.UNAUTHORIZED_CODE).json({
                status: httpStatusCodes.UNAUTHORIZED_CODE,
                message: httpStatusCodes.UNAUTHORIZED_URL
            });

            return;
        }

        if (!(authorizedTokenString && authorizedTokenString.split(' ')[1])) {
            res.status(httpStatusCodes.UNAUTHORIZED_CODE).json({
                status: httpStatusCodes.UNAUTHORIZED_CODE,
                message: httpStatusCodes.UNAUTHORIZED_URL
            });

            return;
        }

        const accessToken = authorizedTokenString.split(' ')[1];

        const docodedData: DecodedType = await new Promise((resolve: any, reject: any) => {
            jwt.verify(accessToken, TOKEN, (err, decoded) => {
                if (err) {
                    reject(err);
                }

                resolve(decoded);
            });
        });

        if (docodedData.role === 'admin') {
            // Role is admin
            // get admin data from database and get latest admin object
            req[`admin`] = {};
            next();
        } else {
            // Role is user
            // get user data from database and get latest user object
            req[`user`] = {};
            next();
        }
    } catch (error: any) {
        res.json({
            status: httpStatusCodes.TOKEN_EXPIRED_CODE,
            message: httpStatusCodes.TOKEN_EXPIRED,
            error
        });
        return;
    }
}

export default tokenHandler;
