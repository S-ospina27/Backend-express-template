import mySQL from 'mysql2/promise';
import 'dotenv/config';

export const connection = mySQL.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB
});
