module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      firstName: { type: DataTypes.STRING, field: 'first_name', allowNull: false },
      lastName: { type: DataTypes.STRING, field: 'last_name', allowNull: false },
      email: { type: DataTypes.STRING, field: 'email', allowNull: false, unique: true },
      password: { type: DataTypes.STRING, field: 'password', allowNull: false }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  return User;
};
