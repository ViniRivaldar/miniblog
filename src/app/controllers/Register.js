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
}

export default new RegisterController();
