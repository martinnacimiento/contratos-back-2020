const { DataTypes } = require("sequelize")
const db = require("../lib/sequelize")

/**
 * Define la tabla "applicants" y sus campos
 */
const Applicant = db.define("applicants", {
  applicant: { type: DataTypes.STRING, allowNull: false },
})

/**
 * Define la tabla "states" y sus campos
 */
const State = db.define("states", {
  state: { type: DataTypes.STRING(20), allowNull: false },
})

/**
 * Define la tabla "sexes" y sus campos
 */
const Sex = db.define("sexes", {
  sex: { type: DataTypes.STRING(10), allowNull: false },
})

/**
 * Define la tabla "users" y sus campos
 */
const User = db.define("users", {
  username: { type: DataTypes.STRING(20), allowNull: false },
  password: { type: DataTypes.STRING(30), allowNull: false },
})

/**
 * Define la tabla "roles" y sus campos
 */
const Role = db.define("roles", {
  name: { type: DataTypes.STRING(20), allowNull: false },
  slug: { type: DataTypes.STRING(20), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
})

/**
 * Define la tabla "permissions" y sus campos
 */
const Permission = db.define("permissions", {
  name: { type: DataTypes.STRING(50), allowNull: false },
  slug: { type: DataTypes.STRING(30), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
})

User.belongsToMany(Role, { through: "users_roles" })
Role.belongsToMany(User, { through: "users_roles" })

Role.belongsToMany(Permission, { through: "roles_permissions" })
Permission.belongsToMany(Role, { through: "roles_permissions" })

/**
 * Define la tabla "object" y sus campos
 */
const Object = db.define("object", {
  object: { type: DataTypes.STRING(50), allowNull: false },
})

/**
 * Define la tabla "persons" y sus campos
 */
const Person = db.define("persons", {
  surname: { type: DataTypes.STRING(20), allowNull: false },
  name: { type: DataTypes.STRING(50), allowNull: false },
  dni: { type: DataTypes.STRING(8), allowNull: false },
  domicile: { type: DataTypes.STRING(100) },
  mail: { type: DataTypes.STRING(50) },
  telephone: { type: DataTypes.STRING(20) },
  date_birth: { type: DataTypes.DATE },
  cuit: { type: DataTypes.STRING(11), allowNull: false },
})

/**
 * Define una relación entre Persona y Sexo, * -> 1
 */
Person.Sex = Person.belongsTo(Sex, {
  foreignKey: {
    name: "sex_id",
  },
})

/**
 * Define una tabla "contracts" y sus campos
 */
const Contract = db.define("contracts", {
  date_from: { type: DataTypes.DATE },
  date_until: { type: DataTypes.DATE },
  date_order: { type: DataTypes.DATE },
  number_order: { type: DataTypes.STRING(8) },
  reason: { type: DataTypes.TEXT },
  attached: { type: DataTypes.STRING(50) },
  created_at: { type: DataTypes.DATE },
  updated_at: { type: DataTypes.DATE },
})

/**
 * Define una relación entre Contrato y Estado, * -> 1
 */
Contract.belongsTo(State, {
  foreignKey: {
    name: "state_id",
  },
})

/**
 * Define una relación entre Contrato y Persona, * -> 1
 */
Contract.belongsTo(Person, {
  foreignKey: {
    name: "person_id",
  },
})

/**
 * Define una relación entre Contrato y Solicitante, * -> 1
 */
Contract.belongsTo(Applicant, {
  foreignKey: {
    name: "applicant_id",
  },
})

/**
 * Define una relación entre Contrato y Objeto, * -> 1
 */
Contract.belongsTo(Object, {
  foreignKey: {
    name: "object_id",
  },
})

module.exports = {
  Applicant,
  Person,
  Sex,
  Object,
  Contract,
  State,
  Role,
  User,
  Permission,
}
