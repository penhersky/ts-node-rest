import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import Model from '../src/database/models/index';

describe('#Model Chat', () => {
    it.skip('Test Create message model', async () => {
        Model.Message.sync({ force: true }).then(() => {
            Model.Dialog.create({
                author: 1,
                partner: 2,
                dialog: 1,
                text: 'hello!',
            });
        });
    });

    it.skip('Test Create dialog model', async () => {
        Model.Dialog.sync({ force: true }).then(() => {
            Model.Dialog.create({
                author: 1,
                partner: 2,
            });
        });
    });

    it('Test Create message ({author: 1, partner: 2, dialog: 1, text: "Hello!"})', async () => {
        const newMessage = await Model.Message.create({ author: 1, partner: 2, dialog: 1, text: 'Hello!' });
        _.isNull(await Model.Message.findByPk(newMessage.id)).should.not.be.true;
        await Model.Message.destroy({ where: { id: newMessage.id } });
    });

    it('Test Create dialog ({author: 1, partner: 2})', async () => {
        const newDialog = await Model.Dialog.create({ author: 1, partner: 2 });
        _.isNull(await Model.Dialog.findByPk(newDialog.id)).should.not.be.true;
        await Model.Dialog.destroy({ where: { id: newDialog.id } });
    });
});
