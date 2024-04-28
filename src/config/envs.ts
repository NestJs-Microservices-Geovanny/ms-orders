import 'dotenv/config';
import * as joi from 'joi';

interface IenvVars {
  PORT: number;
  NATS_SERVER: string[];
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVER: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IenvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServer: envVars.NATS_SERVER,
};
