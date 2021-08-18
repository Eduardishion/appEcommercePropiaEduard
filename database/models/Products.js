'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Imagesproducts, { foreignKey: 'product_id' });
    }
  };
  Products.init({
    name: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    category: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    discountRate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    features: {
      type: Sequelize.TEXT
    },
    registrationDate: {
      type: Sequelize.DATE
    },
    checkInTime: {
      type: Sequelize.DATEONLY
    },
    userWhoRegistered: {
      type: Sequelize.STRING
    }
    
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};