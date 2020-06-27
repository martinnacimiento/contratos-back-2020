const { DataTypes } = require("sequelize");
const db = require("../lib/sequelize");

const Applicant = db.define("applicants", {
  id: {type: DataTypes.SMALLINT, primaryKey: true},
  applicant: { type: DataTypes.STRING },
});

module.exports = {
  Applicant
}
