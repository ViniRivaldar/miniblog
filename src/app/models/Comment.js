import Sequelize, { Model } from 'sequelize'

class Comment extends Model{
  static init(sequelize){
    super.init({
      content: Sequelize.TEXT,
    },{
      sequelize,
       modelName: 'Comment'
    })
  }
  static associate(models){
    this.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post'})
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
  }
}

export default Comment