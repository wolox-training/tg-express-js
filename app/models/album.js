'use strict';

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'albums',
    {
      id: DataTypes.INTEGER,
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'albums'
    }
  );
  Album.associate = models => {
    Album.belongsToMany(models.users, {
      through: 'UserAlbums',
      as: 'users',
      foreignKey: 'albumId',
      otherKey: 'userId'
    });
  };
  return Album;
};
