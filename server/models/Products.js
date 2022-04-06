module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "oncart",
    },
	detail: {
		type: DataTypes.STRING(500),
		allowNull: true,
	  },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
  });

  return Products;
};
