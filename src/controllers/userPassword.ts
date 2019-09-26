import bcrypt from 'bcryptjs';
import { SALT } from '../config';

export const hash = async (password: string): Promise<string> => {
    try {
        const salt: string = await bcrypt.genSalt(SALT);
        const hasPassword: string = await bcrypt.hash(password.toString(), Number(salt));
        return hasPassword;
    } catch (error) {
        throw error;
    }
};

export const compare = async (password: string, correctPassword: string): Promise<boolean> => {
    try {
        const validPassword: boolean = await bcrypt.compare(password, correctPassword);
        return validPassword;
    } catch (error) {
        throw error;
    }
};
