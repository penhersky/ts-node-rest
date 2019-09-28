import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import { registerValidation, authValidation } from '../src/controllers/auth/validationAuth';

describe('#Validation validationAuth.ts', () => {
    it("Test validation register {login: 'User12', email: 'User@gmail.com', password: '123456'}", async () => {
        _.isUndefined(
            await registerValidation({
                login: 'User12',
                email: 'User@gmail.com',
                password: '1223346',
            }),
        ).should.be.true;
    });
    it("Test validation register {login: 'User12', email: 'User@gmail.com', password: '123456'}", async () => {
        _.isString(
            await registerValidation({
                login: 'User12',
                email: 'User@gmail.com',
                password: '1',
            }),
        ).should.be.true;
    });
});
