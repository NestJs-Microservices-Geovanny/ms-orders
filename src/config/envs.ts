import 'dotenv/config';
import * as joi from 'joi';

interface IenvVars {
  PORT: number;
}
//se crea un esquema para validar las variables de entorno
const envSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
//si hay un error se lanza una excepción
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IenvVars = value;

export const envs = {
  port: envVars.PORT,
};
