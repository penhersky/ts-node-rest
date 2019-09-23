import Sequelize from 'sequelize';
import { urlDB } from './config';

const sequelize = new Sequelize(urlDB);

export default sequelize;
