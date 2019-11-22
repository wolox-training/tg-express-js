module.exports = (sequelize, DataTypes) => {
  const UserAlbums = sequelize.define(
    'userAlbums',
    {
      userId: { allowNull: false, type: DataTypes.INTEGER, field: 'user_id', primaryKey: true },
      albumId: { allowNull: false, type: DataTypes.INTEGER, field: 'album_id', primaryKey: true }
    },
    { underscored: true, tableName: 'user_albums' }
  );

  UserAlbums.removeAttribute('id');

  return UserAlbums;
};
