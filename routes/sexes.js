var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");
const { idSchema } = require("../utils/schemas/general");
const { sexSchema } = require("../utils/schemas/sexes");
const validation = require("../utils/middlewares/validationHandler");

/* GET sexes listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM sexes", []);
  res.json({ sexes: rows });
});

/* POST sexes creating. */
router.post("/", validation(sexSchema), async (req, res, next) => {
  const { body: sex } = req;
  const { rowCount } = await db.query("INSERT INTO sexes (sex) VALUES ($1)", [
    sex.sex,
  ]);
  res.json({ message: "Sexo creado!" });
});

/* PUT sexes updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(sexSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: sex } = req;
    const {} = await db.query("UPDATE sexes SET sex=$1 WHERE id=$2", [
      sex.sex,
      id,
    ]);
    res.json({ message: `Sexo ${id} actualizado!` });
  }
);

/* DELETE sexes deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const {} = db.query("DELETE FROM sexes WHERE id=$1", [id]);
    res.json({ message: `Sexo ${id} eliminado!` });
  }
);

module.exports = router;
