const { User, Role } = require("../models")
const bcrypt = require("bcrypt")

const salt = 10

const password = process.argv[2] || process.env.ADMIN_PASSWORD

const payloadRole = {
  name: "admin",
  slug: "admin",
  description: "administrador",
  permissions: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
  ],
}

const payloadUser = {
  username: "admin",
  password: "",
  roles: [1],
}

async function seed(password) {
  const roleCreated = await Role.create(payloadRole)
  roleCreated.setPermissions(payloadRole.permissions)
  console.log("Rol creado!");

  await bcrypt.hash(password, salt, async function (err, hash) {
    payloadUser.password = hash
    const userCreated = await User.create(payloadUser)
    userCreated.setRoles(payloadUser.roles)
  })
  console.log("Admin creado!");
}

seed(password)