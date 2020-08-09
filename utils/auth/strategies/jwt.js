const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const boom = require("boom")
const { config } = require("../../../config")
const { User } = require("../../../models")

const strategyOptions = {
  secretOrKey: config.authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

async function authenticate(tokenPayload, cb) {
  try {
    const user = await User.findOne({ where: { username: tokenPayload.sub } })

    if (!user) return cb(boom.unauthorized(), false)

    const roles = await user.getRoles()
    let permissions = []
    console.log(`ROLES: ${roles}`)
    let promises = roles.map(async r => {
      let auxPermissions = await r.getPermissions()
      auxPermissions = auxPermissions.map(p => p.slug)
      permissions = permissions.concat(auxPermissions)
    })
    await Promise.all(promises)
    user.scope = permissions

    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
}

passport.use(new Strategy(strategyOptions, authenticate))
