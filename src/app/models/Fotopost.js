import Sequelize, { Model } from "sequelize";

class FotoPost extends Model{
  static init(sequelize){
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      originalmente:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          notEmpty:{
            msg: 'o campo não ser vazio'
          }        
        }
      },
      filename:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          notEmpty:{
            msg: 'o campo não ser vazio'
          }
        }
      },
      post_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          const filename = this.getDataValue('filename');
          if (!filename) return null;
          return `https://res.cloudinary.com/dij2lqiy7/image/upload/${filename}`;
        }
      }
    },{sequelize, tableName: 'foto_post'})
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

export default FotoPost