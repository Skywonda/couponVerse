const { DataTypes, Model } = require("sequelize");

const sequelize = require("../config/provider/db");

class Product extends Model { }

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'product'
  }
);

module.exports = Product;
