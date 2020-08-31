"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("AccumulateAudiences", {
      fields: ["room_id"],
      type: "foreign key",
      name: "acc_audience_foreign_key_3",
      references: {
        table: "Rooms",
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
      "AccumulateAudiences",
      "acc_audience_foreign_key_3"
    );
  },
};
