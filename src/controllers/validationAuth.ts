import Joi from '@hapi/joi';

export const registerValidation: Function = (
    data: { login: String; email: String; password: String },
    cb: Function,
) => {
    const schema: Object = {
        login: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string().min(5),
    };
    cb(Joi.validate(data, schema));
};

export const authValidation: Function = (data: { login: String; password: String }, cb: Function) => {
    const schema: Object = {
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string().min(5),
    };
    cb(Joi.validate(data, schema));
};
