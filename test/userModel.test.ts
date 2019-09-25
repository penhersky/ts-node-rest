import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import Model from '../src/database/models/index';

describe.only('#User Model', () => {
    it('Test Create user ({login: Jon, email: jon49@eamil.com, password: erathrsyjdkf, image: util/img/user1.pmg})', async () => {
        (await Model.User.create({
            login: 'Jon',
            email: 'jon49@eamil.com',
            password: 'erathrsyjdkf',
            image: 'util/img/user1.pmg',
        })).email.should.be.true;
    });
});
