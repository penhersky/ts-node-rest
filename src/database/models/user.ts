import Sequelize from 'sequelize';

import sequelize from '../connectDB';

class User extends Sequelize.Model {
    public id!: number;
    public login!: string;
    public email!: string;
    public image!: string;
    public password!: string;

    public readonly createdAt!: Date;
}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: new Sequelize.DataTypes.STRING(28),
            allowNull: false,
        },
        email: {
            type: new Sequelize.DataTypes.STRING(128),
            allowNull: false,
        },
        image: {
            type: new Sequelize.DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new Sequelize.DataTypes.STRING(28),
            allowNull: false,
        },
    },
    { sequelize, tableName: 'User' },
);

export default User;
