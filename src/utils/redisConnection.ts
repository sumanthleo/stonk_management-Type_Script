import Queue from 'bull';
import { logger } from './logger';
import * as bluebird from 'bluebird';

export class RedisConnection {
    static client: any;
    // Initialize your redis connection
    public static init(): any {
        const { REDIS_URL, REDIS_PORT, REDIS_PASS } = process.env;

        // @ts-ignore
        this.client = new Queue({
            host: REDIS_URL,
            port: REDIS_PORT,
            password: REDIS_PASS
        });

        (this.client as any).Promise = bluebird;
        this.client.on('connect', () => logger.info('Connected to redis server'));
        this.client.on('error', () => logger.info('Failed to connect to redis server'));
    }
}
