module.exports = (sequelize, DataTypes) => {
  const UserAlbums = sequelize.define(
    'userAlbums',
    {
      userId: { allowNull: false, type: DataTypes.INTEGER, field: 'user_id' },
      albumId: { allowNull: false, type: DataTypes.INTEGER, field: 'album_id' }
    },
    { underscored: true, tableName: 'user_albums' }
  );

  return UserAlbums;
};
