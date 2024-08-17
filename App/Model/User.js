import { model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

export const UserSchema = new Schema({
    // googleId : {type:String},
    name: { type: String,required:true},
    email: { type: String,required:true},
    password: { type: String,required:true},
}, {
    timestamps: true
});

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ uid: this._id }, process.env.JWT_PRIVATE_KEY);
};

export default model('User', UserSchema);