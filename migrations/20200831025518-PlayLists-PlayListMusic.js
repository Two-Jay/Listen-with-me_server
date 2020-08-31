"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("PlayListMusics", {
      fields: ["playlist_id"],
      type: "foreign key",
      name: "playlist_musics_foreign_key",
      references: {
        table: "PlayLists",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      "PlayListMusics",
      "playlist_musics_foreign_key"
    );
  },
};
