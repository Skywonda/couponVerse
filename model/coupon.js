const { DataTypes, Model, DECIMAL } = require("sequelize");

const sequelize = require("sequelize");

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
    rule: {
      cart_item: {
        type: DataTypes.NUMBER,
      },
      dicount_amount: {
        type: DataTypes.NUMBER,
      },
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

class Rule extends Model { }

Rule.init({
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

class Discount extends Model { }

Discount.init({
  amount: {
    type: DataTypes.NUMBER,
  },
  type: DataTypes.ENUM(["FIXED", "PERCENT", "MIXED"]),
});

Discount.belongsTo(Coupon)
Rule.belongsTo(Coupon)

module.exports = Coupon;
