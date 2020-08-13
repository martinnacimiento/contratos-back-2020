const { seed } = require("./utils/seedAdmin")
seed()
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers")
const helmet = require("helmet")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const personsRouter = require("./routes/persons")
const contractsRouter = require("./routes/contracts")
const statesRouter = require("./routes/states")
const sexesRouter = require("./routes/sexes")
const applicantsRouter = require("./routes/applicants")
const objectsRouter = require("./routes/objects")
const permissionsRouter = require("./routes/permissions")
const rolesRouter = require("./routes/roles")
const authApiRouter = require("./routes/auth")

const app = express()

// MIDDLEWARES
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(helmet())

// ROUTES
app.use("/", indexRouter)
app.use("/usuarios", usersRouter)
app.use("/personas", personsRouter)
app.use("/contratos", contractsRouter)
app.use("/estados", statesRouter)
app.use("/sexos", sexesRouter)
app.use("/solicitantes", applicantsRouter)
app.use("/objetos", objectsRouter)
app.use("/permisos", permissionsRouter)
app.use("/roles", rolesRouter)
app.use("/login", authApiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

module.exports = app
