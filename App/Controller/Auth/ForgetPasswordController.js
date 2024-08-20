import nodemailer from 'nodemailer';
import User from '../../Model/User.js';
import ForgetPasswod from '../../Model/ForgetPasswod.js';
import _ from  'lodash';
import bcrypt from 'bcrypt'
import Joi from 'joi';
import {validateLogin} from '../../Request/AuthRequest.js'
const sendOtpToUser = async (req, res) => {
    try {
        // const { userEmail } = req.body.email;
        // console.log("email",userEmail);

        console.log("Request body:", req.body);

        const user = await User.findOne({ email: req.body.email });
        console.log("User found:", user);

        if (!user) {
            console.log("User not found with email:", req.body.email);
            return res.status(404).json({ message: "User not found. Please enter a valid email address." });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "akshark.octal8@gmail.com",
                pass: "aapcmdgquuhoqkks",
            },
        });

        const token = Math.floor(10000000000 + Math.random() * 90000000000);
        const forgetPasswodData = { email: user.email, token };
        const pass = await ForgetPasswod.create(forgetPasswodData);
        console.log("forgetpass data ", pass);

        const info = await transporter.sendMail({
            from: 'akshark.octal8@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "otp", // Subject line
            text: "otp", // plain text body
            html: `<b>OTP ${token}</b>`, // html body
        });
        if (info) {
            return res.json({ message: "OTP sent successfully. Please check your email." });
        } else {
            console.log("Error: Email sending failed.");
            return res.status(500).json({ message: "Error sending OTP. Please try again." });
        }

    } catch (error) {
        console.log("Error sending OTP:", error);
        return res.status(500).json({ message: "Error sending OTP. Please try again." });
    }
}

const verifyOtp = async (req, res) => {
    try {
        // const userOtp = req.body.token;
        const checktoken = await ForgetPasswod.findOne({token:req.body.token})
    
        if(checktoken){
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        else{
            return res.status(401).json({ error: "Invalid OTP. Please try again." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error verifying OTP. Please try again." });
    }
}
const resetPassword = async (req, res) => {
    try {
      const { error } = await validateLogin(req.body.password);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
      const tokenData = await ForgetPasswod.findOne({ token: req.body.token });
      if (tokenData) {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword == confirmPassword) {
          const user = await User.findOne({ email: tokenData.email });
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          const updatedUser = await User.findByIdAndUpdate(user.id, { password: hashedPassword });
          if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update password" });
          }
          return res.status(200).json({ message: "Password updated successfully" });
        } else {
          return res.status(400).json({ message: "Passwords do not match" });
        }
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
export default {
    sendOtpToUser,
    verifyOtp,
    resetPassword
}