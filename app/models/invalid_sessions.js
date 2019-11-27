'use strict';
module.exports = (sequelize, DataTypes) => {
  const invalidSessions = sequelize.define(
    'invalidSessions',
    {
      userId: { allowNull: false, type: DataTypes.INTEGER, field: 'user_id', primaryKey: true }
    },
    { underscored: true, tableName: 'invalid_sessions' }
  );
  invalidSessions.associate = models => {
    invalidSessions.belongsTo(models.users);
  };
  return invalidSessions;
};
