import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function authConfig(user){
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
        
  };

  const options = {
    expiresIn: '7d'
  };

  const token = jwt.sign(payload,process.env.JWT_SECRET, options);
  return token;

}

export default authConfig