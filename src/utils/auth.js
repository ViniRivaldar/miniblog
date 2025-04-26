import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function authMiddleware (req, res, next){
  const {authorization} = req.headers;

  if(!authorization){
    return res.status(401).json({error: 'Token not provided'});
  }

  const [, token] = authorization.split(' ');

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userAdmin = decoded.userAdmin;

  
    return next();
  }catch(err){
    return res.status(401).json({error: 'Token invalid'});
  }
}