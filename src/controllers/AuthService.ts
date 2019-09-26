import { registerValidation, authValidation } from './validationAuth';
import { isDevelopment } from '../config';
import { hash, compare } from './userPassword';
import { createToken } from './token';
import Model from '../database/models/index';

export const register = async (
    login: String,
    email: String,
    password: String,
): Promise<{ error: String | undefined; status: number }> => {
    try {
        const validation: String | undefined = await registerValidation({ login, email, password });

        if (validation) return { error: validation, status: 400 };

        const UserEmail = await Model.User.findAll({ where: { email: String(email) } });
        const UserLogin = await Model.User.findAll({ where: { email: String(email) } });

        if (UserEmail || UserLogin) return { status: 409, error: 'A user with this login or email exists' };

        const hasPassword: string = await hash(password.toString());

        await Model.User.create({ login, email, password: hasPassword });

        return { status: 201, error: undefined };
    } catch (error) {
        if (isDevelopment) console.log(error);
        return { status: 500, error: 'Server Error!' };
    }
};

export const authorization = async (
    email: String,
    password: String,
): Promise<{ error: String | undefined; token: string | undefined; status: number }> => {
    try {
        const validation: String | undefined = await authValidation({ email, password });
        if (validation) return { error: validation, status: 400, token: undefined };

        const UserEmail = await Model.User.findOne({ where: { email: String(email) } });
        if (!UserEmail) return { status: 409, error: 'User is not fount!', token: undefined };

        const validationPassword: boolean = await compare(password.toString(), UserEmail.password);
        if (!validationPassword) return { status: 409, error: 'Invalid password!', token: undefined };

        const token = await createToken(UserEmail.id.toString(), UserEmail.login, UserEmail.email);

        return { status: 200, error: undefined, token };
    } catch (error) {
        if (isDevelopment) console.log(error);
        return { status: 500, error: 'Server Error!', token: undefined };
    }
};
