'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Imagesproducts, { foreignKey: 'product_id' });
    }
  };
  Products.init({
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discountRate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    features: {
      type: DataTypes.TEXT
    },
    registrationDate: {
      type: DataTypes.DATE
    },
    checkInTime: {
      type: DataTypes.DATEONLY
    },
    userWhoRegistered: {
      type: DataTypes.STRING
    }
    
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};