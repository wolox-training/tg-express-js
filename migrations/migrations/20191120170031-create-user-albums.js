'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('user_albums', {
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        album_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        queryInterface.addConstraint('user_albums', ['user_id', 'album_id'], {
          type: 'primary key',
          name: 'user_albums_pkey'
        });
      }),
  down: queryInterface => queryInterface.dropTable('user_albums')
};
