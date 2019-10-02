import Sequelize from 'sequelize';

import sequelize from '../connectDB';

export class Dialog extends Sequelize.Model {
    public id!: number;
    public author!: string;
    public partner!: string;

    public readonly createdAt!: Date;
}

type MyModelStatic = typeof Sequelize.Model & {
    new (values?: object, options?: Sequelize.BuildOptions): Dialog;
};

const DialogModel = <MyModelStatic>sequelize.define(
    'dialog',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        author: {
            type: new Sequelize.DataTypes.INTEGER(),
            allowNull: false,
        },
        partner: {
            type: new Sequelize.DataTypes.INTEGER(),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    },
);

export default DialogModel;
