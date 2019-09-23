import bcrypt from 'bcryptjs';

import { registerValidation } from './validationAuth';

export const register = (login: String, email: String, password: String, cb: Function) => {
    registerValidation({ login, email, password }, (validation: { error: { details: { message: any }[] } }) => {
        if (validation.error) cb({ error: validation.error.details[0].message, status: 400 });
    });
    // further verification and submission of the result
};
//export const authorization = ()
