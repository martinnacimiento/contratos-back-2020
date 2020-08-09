const passport = require("passport")
const { BasicStrategy } = require("passport-http")
const boom = require("boom")
const bcrypt = require("bcrypt")
const { User } = require("../../../models")

async function login(username, password, cb) {
  try {
    const user = await User.findOne({ where: { username } })

    if (!user) return cb(boom.unauthorized(), false)

    if (!(await bcrypt.compare(password, user.password)))
      return cb(boom.unauthorized(), false)

    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
}

passport.use(new BasicStrategy(login))
