'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.category);  //funcional con .this
      product.belongsTo(models.category,{
        foreignKey: 'category_id',
        as:'category'
      });

      product.hasMany(models.image,{
        foreignKey: 'product_id',
        as:'image'
      });

    }
  };
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discountRate: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    features: DataTypes.TEXT,
    registrationDate: DataTypes.DATE,
    userWhoRegistered: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};