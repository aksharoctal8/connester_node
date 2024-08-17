import { model } from "mongoose";
import { UserSchema } from "./User.js";
import { ForgetPassWordSchema } from "./ForgetPasswod.js"

export default async()=>{
    model('users',UserSchema);
    model('forgetpassword',ForgetPassWordSchema);
}