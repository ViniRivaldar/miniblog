import Sequelize, { Model } from 'sequelize'

class Comment extends Model{
  static init(sequelize){
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: Sequelize.TEXT,
       post_id: Sequelize.UUID,
       user_id: Sequelize.UUID
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