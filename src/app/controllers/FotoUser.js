import FotoUser from "../models/FotoUser.js"; 
import Cloudinary from "../../utils/services/cloudinaryConfig.js";

class FotoUserController {
  async store(req, res) {
    try {
      const { originalname, filename, path } = req.file;
      const foto = await FotoUser.create({
        originalmente: originalname,
        filename: filename,  
        user_id: req.userId,
        url: path,
      });
      
      return res.json(foto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao salvar a foto no banco" });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const foto = await FotoUser.findByPk(id);

      if (!foto) {
        return res.status(404).json({ error: "Foto não encontrada!" });
      }

      if (foto.user_id !== req.userId) {
        return res.status(403).json({ error: "Você não tem permissão para excluir essa foto!" });
      }

      const publicId = foto.filename; // Agora pega o caminho completo!!

      const cloudinaryResult = await Cloudinary.uploader.destroy(publicId);

      console.log("Resultado da exclusão do Cloudinary:", cloudinaryResult);

      if (cloudinaryResult.result !== "ok") {
        return res.status(500).json({ error: "Erro ao excluir imagem do Cloudinary" });
      }

      await FotoUser.destroy({ where: { id } });

      return res.status(200).json({ message: "Foto excluída com sucesso!" });

    } catch (error) {
      console.error("Erro no processo de exclusão:", error);
      return res.status(500).json({ error: "Erro ao excluir a foto" });
    }
  }
}

export default new FotoUserController();
