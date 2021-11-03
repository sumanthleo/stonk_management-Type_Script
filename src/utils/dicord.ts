import { Webhook } from 'discord-webhook-node';
import Transport from 'winston-transport';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const hook = new Webhook({
    url: process.env.DISCORD_DSN!
});

const logToDiscord = (err: any) => {
    hook.error('Starter-Project', 'Error', err?.message);
};

class DiscordTransport extends Transport {
    constructor(opts: object) {
        super(opts);
    }

    log(err, callback) {
        logToDiscord(err);
        callback();
    }
}

export default DiscordTransport;
