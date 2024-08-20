import { Router } from "express";
import User from "../../Model/User.js";
import AuthController from './AuthController.js';
import ProfileController from "./ProfileController.js"
import AuthMiddlware from "../../Middlware/AuthMiddlware.js"
import ForgetPasswordController from "./ForgetPasswordController.js";
// import passport from "passport";
const route = Router();
// route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// route.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//     console.log("Googgle data",res);
//     // return res.status(200).json({message:"Google Login",resdata:res})
// });

route.post("/signup",User.uploadImage,AuthController.register);
route.post("/login", AuthController.login)
route.get("/profile", AuthMiddlware.verfyToken, ProfileController.profile);
route.post("/forgetpassword/checkuser", ForgetPasswordController.sendOtpToUser);
route.post("/forgetpassword/checkotp", ForgetPasswordController.verifyOtp);
route.post("/forgetpassword/createpassword", ForgetPasswordController.resetPassword);

export default route