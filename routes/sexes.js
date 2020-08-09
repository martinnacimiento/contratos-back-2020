var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const { sexSchema } = require("../utils/schemas/sexes")
const validation = require("../utils/middlewares/validationHandler")
const { Sex } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }

/* GET sexes listing. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("index.sex"),
  async (req, res, next) => {
    const sexes = await Sex.findAll()
    res.json({ sexes: sexes })
  }
)

/* GET a sex. */
router.get(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("show.sex"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    const sex = await Sex.findByPk(id)
    res.json({ sex: sex })
  }
)

/* POST sexes creating. */
router.post(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("create.sex"),
  validation(sexSchema),
  async (req, res, next) => {
    const { body: sex } = req
    await Sex.create(sex)
    res.json({ message: "Sexo creado!" })
  }
)

/* PUT sexes updating. */
router.put(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("edit.sex"),
  validation({ id: idSchema }, "params"),
  validation(sexSchema),
  async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req
    const sex = await Sex.findByPk(id)
    await sex.update(data)
    res.json({ message: `Sexo ${id} actualizado!` })
  }
)

/* DELETE sexes deleting. */
router.delete(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("destroy.sex"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    await Sex.destroy({
      where: { id: id },
    })
    res.json({ message: `Sexo ${id} eliminado!` })
  }
)

module.exports = router
