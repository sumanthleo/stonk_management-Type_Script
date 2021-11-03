// This limit is for shopify product listing, it can be maximum 100
export const DEFAULT_PAGINATION_LIMIT_SHOPIFY_PRODUCT_LIST = 100;

export const TOKEN = 'super.super.secret.shhh';

export enum httpStatusCodes {
    APP_NAME = 'income_shows',
    SUCCESS_CODE = 200,
    FORBIDDEN_CODE = 403,
    BAD_REQUEST_CODE = 400,
    SERVER_ERROR_CODE = 500,
    UNAUTHORIZED_CODE = 401,
    TOKEN_EXPIRED_CODE = 401,
    SERVER_ERROR = 'Oops! Something went wrong',
    TOKEN_EXPIRED = 'Your token is Invalid/expired. Please login again',
    INSUFFICIENT_PARAMETER = 'Insufficient parameters have been passed',
    UNAUTHORIZED_ACCESS = 'Unauthorize access',
    UNAUTHORIZED_URL = 'You are unauthorized user to access this url'
}
