import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { logger } from './utils/logger';
import cluster from 'cluster';
import os from 'os';
import * as http from 'http';
import { RedisConnection } from './utils/redisConnection';

dotenv.config({ path: '../.env ' });

// libuv's threadpool have a default of 4 threads for async operations so we are changing it based on cpu cores
process.env.UV_THREADPOOL_SIZE = String(os.cpus().length);

const main = async () => {
    const PORT = process.env.PORT;

    // init database and redis connection
    // await RedisConnection.init();

    const server = http.createServer(app);

    server.listen(PORT, async () => {
        logger.info(`listening on port ${PORT}`);
    });

    server.on('error', (err) => {
        if (err) {
            logger.error('Server crashed while listening', err);
            throw err;
        }
    });
};

// @ts-ignore
if (cluster.isPrimary) {
    const num_cpus = os.cpus().length;

    for (let i = 0; i < num_cpus; i++) {
        cluster.fork();
    }

    // if any cluster dies fork a new one
    cluster.on('exit', () => {
        cluster.fork();
    });
} else {
    main();
}
