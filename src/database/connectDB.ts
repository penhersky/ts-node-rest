import { DATABASE, USER_NAME, PASSWORD } from './../config';
import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize(String(DATABASE), String(USER_NAME), String(PASSWORD), {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default sequelize;
