import { urlDB } from './../config';
import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize(String(urlDB));

export default sequelize;
