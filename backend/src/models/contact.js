import { DataTypes, Model } from "sequelize";

class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
      },
      { sequelize }
    );
  }
}

export default Contact;
