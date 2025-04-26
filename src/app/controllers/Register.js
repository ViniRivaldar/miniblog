import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

class RegisterController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { name, username, email, password } = req.body;

      const [userExists, emailExists] = await Promise.all([
        User.findOne({ where: { username } }),
        User.findOne({ where: { email } }),
      ]);

      if (userExists) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      if (emailExists) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        admin: false,
      });

      return res.status(201).json({
        message: 'User successfully created',
        userId: user.id,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }

      console.error('Registration error:', err);

      return res.status(500).json({
        error: 'Registration failed',
        details: err.message || err,
      });
    }
  }
  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string(),
      username: Yup.string(),
      email: Yup.string().email('email inválido'),
      password: Yup.string().min(6, 'senha precisa ter no mínimo 6 caracteres'),
    })

    try{
      await schema.validate(req.body, {abortEarly: false});

      const {id}= req.params;
      const user = await User.findByPk(id)
      

      if(!id || id !== req.userId){
        return res.status(403).json({ message: 'Acesso negado' });
      }

      if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const {name, username, email, password} = req.body;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      if (password && password.length < 6) {
        return res.status(400).json({
          error: 'Senha precisa ter no mínimo 6 caracteres',
        });
      }

      await user.update({
        name: name || user.name,
        username: username || user.username,
        email: email || user.email,
        password: user.password,
      })

      return res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
        },
      });
      
      
    }catch(err){
      if (err instanceof Yup.ValidationError){
        return res.status(400).json({
          error: 'Validation failed',
          messages: err.errors,
        });
      }

      console.error('Registration error:', err);

      return res.status(500).json({
        error: 'Registration failed',
        details: err.message || err,
      })
    }
  }
  async delete(req, res){
    
    const {id}= req.params;
    const user = await User.findByPk(id)

    try{
      if(!id || id !== req.userId){
        return res.status(403).json({ message: 'Acesso negado' });
      }

      if(!user){
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();

      return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    }catch(err){
      console.error('Registration error:', err);

      return res.status(500).json({'mensagem': 'erro ao deletar usuário',})
    }
  }
}

export default new RegisterController();
