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

class CouponDiscount extends Model { }

CouponDiscount.init(
  {
    discount_amount: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    discount_type: {
      type: DataTypes.ENUM(["FIXED", "PERCENT", "MIXED"]),
      allowNull: false,
    },
  },
  { sequelize }
);

class CouponRule extends Model { }

CouponRule.init(
  {
    rule_type: {
      type: DataTypes.ENUM(["PRICE", "ITEM"]),
      allowNull: false,
    },
    rule_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

Coupon.hasMany(CouponDiscount, { as: "discount" });
Coupon.hasMany(CouponRule, { as: "rule" });
CouponDiscount.belongsTo(Coupon, { foreignKey: "CouponId", as: "discount" });
CouponRule.belongsTo(Coupon, { foreignKey: "CouponId", as: "rule" });

module.exports = { Coupon, CouponDiscount, CouponRule };
