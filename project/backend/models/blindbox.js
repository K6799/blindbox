module.exports = (sequelize, DataTypes) => {
  const BlindBox = sequelize.define('BlindBox', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // items现在包含权重
    items: {
      type: DataTypes.JSON,
      allowNull: false, // e.g., [{name: 'item1', rarity: 'N', image: 'url', weight: 50}, ...]
    }
  });
  return BlindBox;
};
