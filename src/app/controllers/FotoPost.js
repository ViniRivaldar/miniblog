import FotoPost from '../models/FotoPost.js';
import User from '../models/User.js';

class FotoPostController {
  async store(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      if (!user.admin) {
        return res.status(403).json({ error: 'Apenas administradores podem adicionar fotos' });
      }

      const { originalname, filename } = req.file;
      const { post_id } = req.body;

      if (!post_id) {
        return res.status(400).json({ error: 'O ID do post é obrigatório' });
      }

      console.log("🧾 Dados recebidos para salvar no banco:");
      console.log("originalmente:", originalmente);
      console.log("filename:", filename);
      console.log("post_id:", post_id);

      const foto = await FotoPost.create({
        originalmente: originalname,
        filename: filename,
        post_id: post_id, 
      });

      return res.json(foto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao salvar a foto no banco" });
    }
  }
}

export default new FotoPostController();
