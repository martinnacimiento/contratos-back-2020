var express = require("express")
var router = express.Router()
const { idSchema } = require("../utils/schemas/general")
const validation = require("../utils/middlewares/validationHandler")
const { Permission } = require("../models")
const passport = require("passport")
const jwtScope = require("express-jwt-scope")
require("../utils/auth/strategies/jwt")

const options = { session: false }

/* GET Permissions of user */
router.get(
  "/token",
  passport.authenticate("jwt", options),
  async (req, res, next) => {
    res.json({ permissions: req.user.scope })
  }
)

/* GET a Permissions. */
router.get(
  "/",
  passport.authenticate("jwt", options),
  jwtScope("show.role edit.role"),
  async (req, res, next) => {
    const permissions = await Permission.findAll()
    res.json({ permissions })
  }
)

module.exports = router
