import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import Model from '../src/database/models/index';

describe('#User Model', () => {
    it('Test Create user ({login: Jon, email: jon49@eamil.com, password: erathrsyjdkf, image: util/img/user1.pmg})', async () => {
        const newUser = await Model.User.create({
            login: 'Jon',
            email: 'jon49@eamil.com',
            password: 'erathrsyjdkf',
            image: 'util/img/user1.pmg',
        });
        _.isNull(await Model.User.findByPk(newUser.id)).should.not.be.true;
    });
});
