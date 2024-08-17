import jwt from "jsonwebtoken";

const verfyToken = async (req, res, next) => {
    try {
        if (!req?.headers) {
            return res.status(200).json({ message: 'Access denied. No token provided.', status: 0 })
        }
        const authorization = req.headers["authorization"].split(' ');
        let token = authorization[1];
        if (!token) {
            return res.status(200).json({ message: 'Access denied. No token provided.' })
        }
        const tokenData = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        if (tokenData) next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Authorization error' })
    }
}

export default {
    verfyToken
};