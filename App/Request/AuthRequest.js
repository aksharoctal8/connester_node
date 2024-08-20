import Joi from "joi";
const limit = 8;
const validateLogin = (data) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
            'string.base': 'invalid type',
            'string.empty': 'password  is required',
            'string.min': `password minimum  ${limit} characters`
        }),
        image: Joi.string().required(),

    })

    return Schema.validate(data, { abortEarly: true, allowUnknown: true })
}

export { validateLogin } 