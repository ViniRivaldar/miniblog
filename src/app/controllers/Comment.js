import * as Yup from 'yup';

import User from '../models/User.js';
import Comment from '../models/Comment.js'

class CommentController{
  async index(req, res){
    try{
      const comments = await Comment.findAll({
        order: [['createdAt', 'DESC']]
      })
      return res.status(200).json(comments)
    }catch(err){
      console.error('Index error:', err);
      return res.status(500).json({ error: 'Erro ao buscar comments.', details: err.message || err });
    }
  }
  async store(req, res){
    const schema = Yup.object().shape({
      content: Yup.string().required('Content is required'),
      post_id: Yup.string().required('Post id is required')
    })

    try{
      await schema.validate(req.body, {abortEarly: false})

      const {content, post_id} = req.body;
      const userId = req.userId;

      const user = await User.findByPk(userId)

      if(!user){
        return res.status(400).json({error: 'User not found'})
      }

      const comment = await Comment.create({
        content,
        post_id,
        user_id: userId
      })

      return res.status(200).json({
        mensagem: 'Comment created successfully',
        comment
      })
      
    }catch(err){
      if (err instanceof Yup.ValidationError){
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }
      console.error('Comment error:', err);
      return res.status(500).json({error: 'Erro interno no servidor.', details: err.message || err})
    }
  }
}

export default new CommentController()