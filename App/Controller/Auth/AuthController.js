import User from "../../Model/User.js";
import _ from "lodash";
import bcrypt from 'bcrypt';
import { validateLogin } from '../../Request/AuthRequest.js';

const register = async (req, res) => {
  try {
    // const { googleToken } = req.body;

    const { name, email, password, confirmPassword } = req.body;
    const { error } = await validateLogin(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password == confirmPassword) {
      const image = ''
      if(req.file){
        image =await User.imgPath+' / '+req.file.filename
      }
      const input = _.pick(req.body, ['name', 'email', 'password','image']);
      input['password'] = await bcrypt.hash(input['password'], 10);
      input['image'] = image;

      const user = await User.create(input);

      const response = {
        user: user,
      };
      res.json(response);
    } else {
      return res.status(400).json({ message: "Confirm password does not match" });
    }
  } catch (error) {
    console.log(error);
  }
}
const login = async (req, res) => {
  try {
    console.log(process.env.JWT_PRIVATE_KEY);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const jwt_token = await user.generateAuthToken();
    const response = {
      token: jwt_token
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
}
export default {
  register,
  login
}