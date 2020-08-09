const api = require("express").Router()
const passport = require("passport")
const boom = require("boom")
const jwt = require("jsonwebtoken")

const { config } = require("../config")

// Basic strategy
require("../utils/auth/strategies/basic")

api.post("/", async function (req, res, next) {
  passport.authenticate("basic", async function (error, user) {
    try {
      if (error || !user) {
        return next(boom.unauthorized())
      }

      req.login(user, { session: false }, async function (error) {
        if (error) {
          return next(error)
        }

        const payload = { sub: user.username }
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: "60m",
        })

        return res.status(200).json({ access_token: token })
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
})

module.exports = api
