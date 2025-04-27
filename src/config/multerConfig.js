import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Cloudinary from "../utils/services/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: async (req, file) => {
    let folderName;

    if (req.baseUrl.includes("fotouser")) {
      folderName = "mini-blog/foto-de-perfil"; 
    } else if (req.baseUrl.includes("fotopost")) {
      folderName = "mini-blog/foto-de-post"; 
    } else {
      folderName = "mini-blog"; 
    }

    return {
      folder: folderName,
      allowed_formats: ["jpg", "jpeg", "png"],
    };
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE");
      error.message = "O arquivo precisa ser uma imagem JPG ou PNG";
      return cb(error);
    }
    return cb(null, true);
  },
});

export default upload;