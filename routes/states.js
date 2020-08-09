var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const { stateSchema } = require("../utils/schemas/states")
const validation = require("../utils/middlewares/validationHandler")
const { State } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }

/* GET states listing. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("index.state"),
  async (req, res, next) => {
    const states = await State.findAll()
    res.json({ states: states })
  }
)

/* GET a state. */
router.get(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("show.state"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    const state = await State.findByPk(id)
    res.json({ state: state })
  }
)

/* POST states creating. */
router.post(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("create.state"),
  validation(stateSchema),
  async (req, res, next) => {
    const { body: state } = req
    await State.create(state)
    res.json({ message: "Estado creado!" })
  }
)

/* PUT states updating. */
router.put(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("edit.state"),
  validation({ id: idSchema }, "params"),
  validation(stateSchema),
  async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req
    const state = await State.findByPk(id)
    await state.update(data)
    res.json({ message: `Estado ${id} actualizado!` })
  }
)

/* DELETE states deleting. */
router.delete(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("destroy.state"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    await State.destroy({
      where: { id: id },
    })
    res.json({ message: `Estado ${id} eliminado!` })
  }
)

module.exports = router
