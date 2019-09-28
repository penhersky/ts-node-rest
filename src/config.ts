import dotenv from 'dotenv';
import PATH from 'path';

const root: Function = PATH.join.bind(this, __dirname, '../');
dotenv.config({ path: root('.env') });

export const isProduction: boolean = process.env.NODE_ENV === 'production';
export const isDevelopment: boolean = !isProduction;
export const DATABASE: string | undefined = process.env.DATABASE;
export const USER_NAME: string | undefined = process.env.USER_NAME;
export const PASSWORD: string | undefined = process.env.PASSWORD;
export const port: number | undefined = Number(process.env.PORT);
export const SALT: number | undefined = Number(process.env.SALT);
export const SECRET: string | undefined = process.env.SECRET;
