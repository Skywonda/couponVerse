const { DataTypes, Model, DECIMAL } = require("sequelize");

const sequelize = require("../config/provider/db");

class Coupon extends Model { }

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // discount
    discount_amount: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    discount_type: {
      type: DataTypes.ENUM(["FIXED", "PERCENT", "MIXED"]),
      allowNull: false
    },

    // rule
    rule_type: {
      type: DataTypes.ENUM(["PRICE", "ITEM"]),
      allowNull: false
    },
    rule_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Coupon;
