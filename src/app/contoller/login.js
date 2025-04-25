class LoginController{
  store(req, res){
    return res.json({message: 'Hello World'});
  }
}

export default new LoginController()