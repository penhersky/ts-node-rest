import { registerValidation, authValidation } from './validationAuth';
import { isDevelopment, USER_IMAGE } from '../../config';
import { hash, compare } from './userPassword';
import { createToken } from './token';
import Model from '../../database/models/index';

export const register = async (
    login: String,
    email: String,
    password: String,
): Promise<{ error: String | undefined; status: number }> => {
    try {
        const validationError = await registerValidation({ login, email, password });

        if (validationError) return { error: validationError, status: 400 };

        const UserEmail = await Model.User.findOne({ where: { email: String(email) } });
        const UserLogin = await Model.User.findOne({ where: { login: String(login) } });

        if (UserEmail || UserLogin) return { status: 409, error: 'A user with this login or email exists' };

        const hasPassword = await hash(password.toString());

        await Model.User.create({
            login,
            email,
            password: hasPassword,
            image: String(USER_IMAGE),
            last_seen: Date(),
        });

        return { status: 201, error: undefined };
    } catch (error) {
        if (isDevelopment) console.log(error);
        return { status: 500, error: 'Server Error!' };
    }
};

export const authorization = async (
    email: String,
    password: String,
): Promise<{
    error: String | undefined;
    token: string | undefined;
    status: number;
    id: number | undefined;
    login: string | undefined;
}> => {
    try {
        const validationError = await authValidation({ email, password });
        if (validationError)
            return { error: validationError, status: 400, token: undefined, id: undefined, login: undefined };

        const UserEmail = await Model.User.findOne({ where: { email: String(email) } });
        if (!UserEmail)
            return { status: 401, error: 'User is not fount!', token: undefined, id: undefined, login: undefined };

        const validationPassword = await compare(password.toString(), UserEmail.password);
        if (!validationPassword)
            return { status: 401, error: 'Invalid "password"!', token: undefined, id: undefined, login: undefined };

        const token = await createToken(UserEmail.id.toString(), UserEmail.login, UserEmail.email);

        return { status: 200, error: undefined, token, id: UserEmail.id, login: UserEmail.login };
    } catch (error) {
        if (isDevelopment) console.log(error);
        return { status: 500, error: 'Server Error!', token: undefined, id: undefined, login: undefined };
    }
};
