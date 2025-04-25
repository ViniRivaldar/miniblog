import Sequelize, {Model} from 'sequelize';

class User extends Model{
  static init(sequelize){
    super.init({
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false,
         unique: true,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    }, {
      sequelize
    })
  }
}

export default User