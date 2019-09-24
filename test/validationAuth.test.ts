import { describe, it } from 'mocha';
import chai from 'chai';
import _ from 'lodash';

const should: Chai.Should = chai.should();

import { registerValidation, authValidation } from '../src/controllers/validationAuth';

describe('#Validation validationAuth.ts', () => {
    it("Test validation register {login: 'User12', email: 'User@gmail.com', password: '123456'}", async () => {
        (await registerValidation({
            login: 'User12',
            email: 'User@gmail.com',
            password: '1223346',
        })).should.equal(undefined);
    });
    it("Test validation register {login: 'User12', email: 'User@gmail.com', password: '123456'}", async () => {
        (await registerValidation({
            login: 'User12',
            email: 'User@gmail.com',
            password: '1',
        })).should.not.equal(undefined);
    });
});
