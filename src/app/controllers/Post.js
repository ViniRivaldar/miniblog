import * as Yup from 'yup';

import Post from '../models/Post.js';
import User from '../models/User.js';

class PostController{
  async index(req, res){
    return res.json({message: 'Post index'});
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
}

export default new PostController()