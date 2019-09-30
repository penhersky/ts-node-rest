import { SECRET } from '../../config';
import jwt from 'jsonwebtoken';

export const createToken = async (id: string, login: string, email: string): Promise<string> => {
    try {
        const token: string = await jwt.sign(
            {
                id,
                login,
                email,
            },
            String(SECRET),
            { expiresIn: '7h' },
        );
        return token;
    } catch (error) {
        throw error;
    }
};
