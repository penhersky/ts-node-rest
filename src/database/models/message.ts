import Sequelize from 'sequelize';

import sequelize from '../connectDB';

export class Message extends Sequelize.Model {
    public id!: number;
    public author!: string;
    public partner!: string;
    public text!: string;
    public dialog!: string;
    public file!: string;

    public readonly createdAt!: Date;
}

type MyModelStatic = typeof Sequelize.Model & {
    new (values?: object, options?: Sequelize.BuildOptions): Message;
};

const MessageModel = <MyModelStatic>sequelize.define(
    'message',
    {
        id: {
            type: Sequelize.DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        author: {
            type: new Sequelize.DataTypes.BIGINT(),
            allowNull: false,
        },
        partner: {
            type: new Sequelize.DataTypes.BIGINT(),
            allowNull: false,
        },
        dialog: {
            type: new Sequelize.DataTypes.BIGINT(),
            allowNull: false,
        },
        text: {
            type: new Sequelize.DataTypes.STRING(232),
            allowNull: false,
        },
        file: {
            type: new Sequelize.DataTypes.STRING(128),
        },
    },
    {
        freezeTableName: true,
    },
);

export default MessageModel;
