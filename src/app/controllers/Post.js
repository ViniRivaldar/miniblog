import * as Yup from 'yup';
import Post from '../models/Post.js';
import User from '../models/User.js';
import FotoPost from '../models/FotoPost.js';
import Comment from '../models/Comment.js'

class PostController{
  async index(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
          {
            model: FotoPost,
            as: 'fotos',
            attributes: ['id', 'url', 'filename']
          }
        ],
        order: [['createdAt', 'DESC']],
      });

      if (posts.length === 0) {
        return res.status(204).json({ message: 'Nenhum post encontrado.' });
      }

      return res.status(200).json(posts);
    } catch (err) {
      console.error('Index error:', err);
      return res.status(500).json({ error: 'Erro ao buscar posts.', details: err.message || err });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id,{
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
          {
            model: FotoPost,
            as: 'fotos',
            attributes: ['id', 'url', 'filename']
          },
          {
            model: Comment,
            as: 'comments',
            attributes: ['id', 'content', 'user_id'],
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
              }
            ]
          }
        ]
      });
      if (!post) {
        return res.status(204).json({ message: 'Nenhum post encontrado.' });
      }
      return res.status(200).json(post);
    } catch (err) {
      console.error('Show error:', err);
      return res.status(500).json({ error: 'Erro ao buscar o post.', details: err.message || err });
    }
  }

  async store(req, res){
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    })
    try{
      await schema.validate(req.body, {abortEarly: false});

      const {title, content} = req.body;
      const userId = req.userId;
      const { userAdmin } = req
      const user = await User.findByPk(userId);

      if (!userAdmin) {
        return res.status(401).json({ error: 'User is not admin' });
      }
      if(!user){
        return res.status(400).json({error: 'User not found'});
      }
      const post = await Post.create({
        title,
        content,
        user_id: userId,
      })

      return res.status(200).json({
        message: 'Post created successfully',
        post
      })

    }catch(err){
      if (err instanceof Yup.ValidationError){
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }
      console.error('Post error:', err);
      return res.status(500).json({error: 'Erro interno no servidor.', details: err.message || err})
    }
  }

  async update(req, res){
    const schema = Yup.object().shape({
      title: Yup.string(),
      content: Yup.string(),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
      const { id } = req.params;
      const { userAdmin } = req;
      if (!userAdmin) {
        return res.status(401).json({ error: 'User is not admin' });
      }
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.update(req.body);
      return res.status(200).json({
        message: 'Post updated successfully',
        post,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.', details: err.message || err });
    }
  }

  async delete(req, res){
    try {
      const { id } = req.params;
      const { userAdmin } = req;

      if (!userAdmin) {
        return res.status(401).json({ error: 'User is not admin' });
      }

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const fotos = await FotoPost.findAll({
        where: { post_id: id }
      });


      await Promise.all(fotos.map(foto => foto.destroy()));

      await post.destroy();

      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Erro interno no servidor.', details: err.message || err });
    }
  }
}

export default new PostController();