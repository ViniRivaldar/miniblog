import * as Yup from 'yup';

import User from '../models/User.js';
import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

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
  async update(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string(),
      post_id: Yup.string().uuid('Invalid post ID format'), 
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { id } = req.params;
      const userId = req.userId;
      const { content, post_id } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(400).json({ error: 'Comment not found' });
      }

      if (comment.user_id !== userId) {
        return res.status(403).json({ error: 'You can only update your own comments' });
      }

      if (post_id) {
        const postExists = await Post.findByPk(post_id);
        if (!postExists) {
          return res.status(400).json({ error: 'Post not found' });
        }
      }

      const updatedComment = await comment.update({
        content: content || comment.content, 
        post_id: post_id || comment.post_id 
      });

      return res.status(200).json({
        message: 'Comment updated successfully',
        comment: updatedComment,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }

      console.error('Comment error:', err);
      return res.status(500).json({ error: 'Internal server error.', details: err.message || err });
    }
  }
  async delete(req, res){
    try{
      const {id} = req.params;
      const userId = req.userId
      const admin = req.userAdmin
      const user = await User.findByPk(userId)
      const comment = await Comment.findByPk(id)

      if(!comment){
        return res.status(400).json({error: 'Comment not found'})
      }
      if(!user){
        return res.status(400).json({error: 'User not found'})
      }
      if (comment.user_id !== userId && !admin){
        return res.status(403).json({error: 'You can only delete your own comments'})
      }
      await comment.destroy()

      
      return res.status(200).json({message: 'Comment deleted successfully'})
    }catch(err){
      console.error('Comment error:', err); 

      return res.status(500).json({error: 'Erro interno no servidor.', details: err.message || err})
    }
  }
}

export default new CommentController()