var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const { personSchema } = require("../utils/schemas/persons")
const validation = require("../utils/middlewares/validationHandler")
const { Person, Sex } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }

/* GET persons listing. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("index.person"),
  async (req, res, next) => {
    const persons = await Person.findAll({ include: Sex })
    res.json({ persons: persons })
  }
)

/* GET a person. */
router.get(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("show.person"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    const person = await Person.findByPk(id)
    res.json({ person: person })
  }
)

/* POST persons creating. */
router.post(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("create.person"),
  validation(personSchema),
  async (req, res, next) => {
    const { body: person } = req
    await Person.create(person)
    res.json({ message: "Persona creada!" })
  }
)

/* PUT persons updating. */
router.put(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("edit.person"),
  validation({ id: idSchema }, "params"),
  validation(personSchema),
  async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req
    const person = await Person.findByPk(id)
    await person.update(data)
    res.json({ message: `Persona ${id} actualizada!` })
  }
)

/* DELETE persons deleting. */
router.delete(
  "/:id",
  passport.authenticate("jwt", options),
  jwtScope("destroy.person"),
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params
    await Person.destroy({
      where: { id: id },
    })
    res.json({ message: `Persona ${id} eliminada!` })
  }
)

module.exports = router
