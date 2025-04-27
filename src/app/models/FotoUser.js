import Sequelize, { Model } from 'sequelize';

class FotoUser extends Model{
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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          const filename = this.getDataValue('filename');
          if (!filename) return null;
          return `https://res.cloudinary.com/dij2lqiy7/image/upload/mini%20blog/foto%20de%20perfil/${filename}`;
        }
      }
    },{sequelize, tableName: 'foto_user'})
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default FotoUser