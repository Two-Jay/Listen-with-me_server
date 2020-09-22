"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("AudienceUsers", {
      fields: ["playList_id"],
      type: "foreign key",
      name: "audience_users_foreign_key_2",
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
      "AudienceUsers",
      "audience_users_foreign_key_2"
    );
  },
};
