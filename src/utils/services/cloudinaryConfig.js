import Cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

export default Cloudinary.v2;