const { Sequelize } = require("sequelize")
const { config } = require("../config")

const USER = encodeURIComponent(config.dbUser)
const PASS = encodeURIComponent(config.dbPassword)
const HOST = config.dbHost
const PORT = config.dbPort
const DB = config.dbName

const sequelize = new Sequelize(DB, USER, PASS, {
  host: HOST,
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
})

// Verifica si se conecto a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado")
  })
  .catch(err => {
    console.log("No se conecto")
  })

module.exports = sequelize
