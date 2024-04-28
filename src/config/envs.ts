import 'dotenv/config';
import * as joi from 'joi';

interface IenvVars {
  PORT: number;
  PRODUCTS_MS_PORT: number;
  PRODUCTS_MS_HOST: string;
}
//se crea un esquema para validar las variables de entorno
const envSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
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
  productsMsPort: envVars.PRODUCTS_MS_PORT,
  productsMsHost: envVars.PRODUCTS_MS_HOST,
};
