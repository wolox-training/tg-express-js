'use strict';

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'albums',
    {
      title: DataTypes.STRING
    },
    {
      underscored: true,
      tableName: 'albums'
    }
  );
  Album.associate = models => {
    Album.belongsToMany(models.users, {
      through: models.userAlbums
    });
  };
  return Album;
};
