class RegisterController{
  store(req, res){
    return res.json({message: 'Hello World'});
  }
}

export default new RegisterController()