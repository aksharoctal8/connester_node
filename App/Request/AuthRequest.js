import Joi from "joi";

const validateLogin = (data) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })

    return Schema.validate(data, { abortEarly: true, allowUnknown: true })
}

export { validateLogin } 