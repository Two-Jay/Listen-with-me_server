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
      fields: ["musics_id"],
      type: "foreign key",
      name: "playlist_music_foreign_key_2",
      references: {
        table: "Musics",
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
      "playlist_music_foreign_key_2"
    );
  },
};
