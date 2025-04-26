import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import authConfig from '../../utils/authConfig.js';

class LoginController {
  async store(req, res){
    const schema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    })

    try{
      await schema.validate(req.body, {abortEarly: false});

      const {email, password} = req.body;

      const user = await User.findOne({where: {email}});

      if(!user){
        return res.status(400).json({error: 'Invalid email or password'});
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if(!passwordMatch){
        return res.status(400).json({error: 'Invalid email or password'});
      }

      const token = authConfig(user);

      return res.status(200).json({
        message: 'Login successful',
        token,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      })
    }catch(err){
      if (err instanceof Yup.ValidationError){
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }
      console.error('Login error:', err);

      return res.status(500).json({
        error: 'Login failed',
        details: err.message || err,
      })
    }
    
  }
}

export default new LoginController();
