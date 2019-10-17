import Joi from '@hapi/joi';

export default async (data: { login: String; email: String; image: String }): Promise<String | undefined> => {
    const schema: Joi.ObjectSchema = Joi.object({
        login: Joi.string()
            .min(3)
            .max(26)
            .required(),
        email: Joi.string()
            .email()
            .min(6)
            .required(),
        image: Joi.string().min(320),
    });
    const result: Joi.ValidationResult<{ login: String; email: String; image: String }> = schema.validate(data);
    if (result.error) return result.error.details[0].message;
    return undefined;
};
