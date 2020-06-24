var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");
const { stateSchema } = require("../utils/schemas/states");
const validation = require("../utils/middlewares/validationHandler");

/* GET states listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM states", []);
  res.json({ states: rows });
});

/* POST states creating. */
router.post("/", validation(stateSchema), async (req, res, next) => {
  const { body: state } = req;
  const { rowCount } = await db.query(
    "INSERT INTO states (state) VALUES ($1)",
    [state.state]
  );
  res.json({ message: "Estado creado!" });
});

/* PUT states updating. */
router.put("/:id", validation(stateSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body: state } = req;
  const { rowCount } = await db.query(
    "UPDATE states SET state=$1 WHERE id=$2",
    [state.state, id]
  );
  res.json({ message: `Estado ${id} actualizado!` });
});

/* DELETE states deleting. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {} = db.query("DELETE FROM states WHERE id=$1", [id]);
  res.json({ message: `Estado ${id} eliminado!` });
});

module.exports = router;
