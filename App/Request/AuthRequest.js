import Joi from "joi";
// const pattern = /^[a-zA-Z0-9@!#$%^&*()_+={}\[\]|;:'",.<>/?-]{3,30}$/;
const limit = 8;
const validateLogin = (data) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
        .max(25)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'password'),
        image: Joi.string().optional(),

    })

    return Schema.validate(data, { abortEarly: true, allowUnknown: true })
}

export { validateLogin } 