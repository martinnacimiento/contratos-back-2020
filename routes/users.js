var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const { userSchema } = require("../utils/schemas/users")
const validation = require("../utils/middlewares/validationHandler")
const { User, Role } = require("../models")
const bcrypt = require("bcrypt")
const { Permission } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }
const salt = 10

/* GET Users listing. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("index.user"),
  async (req, res, next) => {
    const users = await User.findAll({
      include: [Role],
    })
    res.json({ users })
  }
)

/* GET a User. */
router.get(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("show.user"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByPk(id, { include: [Role] })
    res.json({ user })
  }
)

/* POST Users creating. */
router.post(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("create.user"),
  validation(userSchema),
  async (req, res, next) => {
    const { body: user } = req
    await bcrypt.hash(user.password, salt, async function (err, hash) {
      user.password = hash
      const userCreated = await User.create(user)
      userCreated.setRoles(user.roles)
      res.json({ message: "Usuario creado!" })
    })
  }
)

/* PUT Users updating. */
router.put(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("edit.user"),
  validation({ id: idSchema }, "params"),
  validation(userSchema),
  async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req
    const User = await User.findByPk(id)
    await User.update(data)
    res.json({ message: `Usuario ${id} actualizado!` })
  }
)

/* DELETE Users deleting. */
router.delete(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("destroy.user"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    if (req.user.id == id) return res.status(400).json({error: "No es posible la autoeliminacion."})
    await User.destroy({
      where: { id: id },
    })
    res.json({ message: `Usuario ${id} eliminado!` })
  }
)

module.exports = router
