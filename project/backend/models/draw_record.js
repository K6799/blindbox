module.exports = (sequelize, DataTypes) => {
  const DrawRecord = sequelize.define('DrawRecord', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // userId and blindBoxId are added via associations
  });
  return DrawRecord;
};
