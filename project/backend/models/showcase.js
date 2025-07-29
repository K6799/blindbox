module.exports = (sequelize, DataTypes) => {
  const Showcase = sequelize.define('Showcase', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // userId is added via associations
  });
  return Showcase;
};