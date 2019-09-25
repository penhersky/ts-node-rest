import Joi from '@hapi/joi';

export const registerValidation = async (data: {
    login: String;
    email: String;
    password: String;
}): Promise<String | undefined> => {
    const schema: Joi.SchemaLike = {
        login: Joi.string()
            .min(3)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string().min(5),
    };
    const result: Joi.ValidationResult<{ login: String; email: String; password: String }> = Joi.validate(data, schema);
    return result.error.details[0].message;
};

export const authValidation = async (data: { email: String; password: String }): Promise<String> => {
    const schema: Joi.SchemaLike = {
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        password: Joi.string().min(5),
    };
    const result: Joi.ValidationResult<{ email: String; password: String }> = Joi.validate(data, schema);
    return result.error.details[0].message;
};
