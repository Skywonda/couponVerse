const { DataTypes, Model, DECIMAL } = require("sequelize");

const sequelize = require("../config/provider/db");

const Product = require("./product");


class Cart extends Model { }

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
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
  }
);

module.exports = Cart;
