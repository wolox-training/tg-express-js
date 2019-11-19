'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'is_admin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'is_admin')
};
