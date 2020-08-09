var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const { RoleSchema } = require("../utils/schemas/roles")
const validation = require("../utils/middlewares/validationHandler")
const { Role, Permission } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }

/* GET Roles listing. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("index.role"),
  async (req, res, next) => {
    const roles = await Role.findAll({ include: [Permission] })
    res.json({ roles })
  }
)

/* GET a Role. */
router.get(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("show.role"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    const role = await Role.findByPk(id, { include: [Permission] })
    res.json({ role })
  }
)

/* POST Roles creating. */
router.post(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("create.role"),
  validation(RoleSchema),
  async (req, res, next) => {
    const { body: data } = req
    const role = await Role.create(data)
    await role.setPermissions(data.permissions)
    res.json({ message: "Rol creado!" })
  }
)

/* PUT Roles updating. */
router.put(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("edit.role"),
  validation({ id: idSchema }, "params"),
  validation(RoleSchema),
  async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req
    const role = await Role.findByPk(id)
    await role.update(data)
    await role.setPermissions(data.permissions)
    res.json({ message: `Rol ${id} actualizado!` })
  }
)

/* DELETE Roles deleting. */
router.delete(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("destroy.role"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    await Role.destroy({ where: { id: id } })
    res.json({ message: `Rol ${id} eliminado!` })
  }
)

module.exports = router
