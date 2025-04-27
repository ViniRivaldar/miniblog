import FotoPost from '../models/FotoPost.js';
import Cloudinary from "../../utils/services/cloudinaryConfig.js";

class FotoPostController {
  async store(req, res) {
    try {
      if (!req.userAdmin) {
        if (req.file && req.file.filename) {
          await Cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(403).json({ error: 'Apenas administradores podem adicionar fotos' });
      }

      const { originalname, filename } = req.file;
      const { post_id } = req.body;

      if (!post_id) {
        await Cloudinary.uploader.destroy(filename);
        return res.status(400).json({ error: 'O ID do post é obrigatório' });
      }

      const foto = await FotoPost.create({
        originalmente: originalname,
        filename: filename,
        post_id: post_id, 
      });

      return res.json(foto);
    } catch (error) {
      console.error(error);

      if (req.file && req.file.filename) {
        try {
          await Cloudinary.uploader.destroy(req.file.filename);
          console.log('Imagem removida do Cloudinary após erro no banco');
        } catch (cloudinaryError) {
          console.error('Erro ao remover imagem do Cloudinary:', cloudinaryError);
        }
      }

      return res.status(500).json({ error: "Erro ao salvar a foto no banco" });
    }
  }
}

export default new FotoPostController();