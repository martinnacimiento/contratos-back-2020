const { DataTypes } = require("sequelize");
const db = require("../lib/sequelize");

const Applicant = db.define("applicants", {
  applicant: { type: DataTypes.STRING, allowNull: false },
});

const State = db.define("states", {
  state: { type: DataTypes.STRING(20), allowNull: false },
});

const Sex = db.define("sexes", {
  sex: { type: DataTypes.STRING(10), allowNull: false },
});

const Object = db.define("object", {
  object: { type: DataTypes.STRING(50), allowNull: false },
});

const Person = db.define("persons", {
  surname: { type: DataTypes.STRING(20), allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  dni: { type: DataTypes.STRING(8), allowNull: false },
  domicile: { type: DataTypes.STRING(100) },
  mail: { type: DataTypes.STRING(50) },
  telephone: { type: DataTypes.STRING(20) },
  date_birth: { type: DataTypes.DATE },
  cuit: { type: DataTypes.STRING(11), allowNull: false },
});
Person.Sex = Person.belongsTo(Sex, {
  foreignKey: {
    name: "sex_id",
  },
});
const Contract = db.define("contracts", {
  date_from: { type: DataTypes.DATE },
  date_until: { type: DataTypes.DATE },
  date_order: { type: DataTypes.DATE },
  number_order: { type: DataTypes.STRING(8) },
  reason: { type: DataTypes.TEXT },
  attached: { type: DataTypes.STRING(50) },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
});
Contract.belongsTo(State, {
  foreignKey: {
    name: "state_id",
  },
});
Contract.belongsTo(Person, {
  foreignKey: {
    name: "person_id",
  },
});
Contract.belongsTo(Applicant, {
  foreignKey: {
    name: "applicant_id",
  },
});
Contract.belongsTo(Object, {
  foreignKey: {
    name: "object_id",
  },
});

module.exports = {
  Applicant,
  Person,
  Sex,
  Object,
  Contract,
  State,
};
