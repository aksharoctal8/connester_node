import { model, Schema } from 'mongoose';

export const ForgetPassWordSchema = new Schema({
    email: { type: String,required:true},
    token: { type: String,required:true},
}, {
    timestamps: true
});


export default model('PassWord', ForgetPassWordSchema);