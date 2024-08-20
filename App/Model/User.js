import { model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const imgPath = process.env.IMAGE_URL;

export const UserSchema = new Schema({
    // googleId : {type:String},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});
const UserImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imgPath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ uid: this._id }, process.env.JWT_PRIVATE_KEY);
};

UserSchema.statics.uploadImage = multer({ storage: UserImageStorage }).single('image');
UserSchema.statics.imgPath = imgPath;

export default model('User', UserSchema);