import bcrypt from 'bcryptjs';

import { registerValidation } from './validationAuth';

export const register = async (
    login: String,
    email: String,
    password: String,
): Promise<{ error: String | undefined; status: number }> => {
    const validation: String = registerValidation({ login, email, password });

    if (validation) return { error: validation, status: 400 };

    // further verification and submission of the result

    return { status: 201, error: undefined };
};
//export const authorization = ()
