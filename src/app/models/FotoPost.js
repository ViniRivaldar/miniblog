import Sequelize, { Model } from 'sequelize';
import Cloudinary from "../../utils/services/cloudinaryConfig.js";

class FotoPost extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          const filename = this.getDataValue('filename');
          if (!filename) return null;
          return `https://res.cloudinary.com/dij2lqiy7/image/upload/${filename}`;
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    }, {
      sequelize,
      tableName: 'foto_post',
    });


    this.addHook('beforeDestroy', async (foto) => {
      try {

        if (foto.filename) {
          const cloudinaryResult = await Cloudinary.uploader.destroy(foto.filename);
          console.log(`Foto excluída do Cloudinary: ${cloudinaryResult}`);
        }
      } catch (error) {
        console.error("Erro ao excluir foto do Cloudinary:", error);
      }
    });
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

export default FotoPost;
