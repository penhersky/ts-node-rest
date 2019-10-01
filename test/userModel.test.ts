import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import Model from '../src/database/models/index';

describe('#User Model', () => {
    it.skip('Test Create user model', async () => {
        Model.User.sync({ force: true }).then(() => {
            Model.User.create({
                login: 'Jon',
                email: 'jon59@gmail.com',
                password: 'erathrsyjdkf',
                last_seen: Date.now(),
                image: 'util/img/user1.pmg',
            });
        });
    });
    it('Test Create user ({login: Jon, email: jon49@eamil.com, password: erathrsyjdkf, image: util/img/user1.pmg})', async () => {
        const newUser = await Model.User.create({
            login: 'Jon',
            email: 'jon49@gmail.com',
            password: 'erathrsyjdkf',
            image: 'util/img/user1.pmg',
            last_seen: Date.now(),
        });
        _.isNull(await Model.User.findByPk(newUser.id)).should.not.be.true;
        await Model.User.destroy({ where: { id: newUser.id } });
    });
});
