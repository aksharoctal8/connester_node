import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const imgPath = process.env.IMAGE_URL;

const imgPath = '/Public/uploades';

export const UserSchema = new Schema(
  {
    // googleId : {type:String},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const UserImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../..",imgPath));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

UserSchema.statics.uploadImage = multer({ storage: UserImageStorage }).single("image");
UserSchema.statics.imgPath = imgPath;

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ uid: this._id }, process.env.JWT_PRIVATE_KEY);
};


export default model("User", UserSchema);
