var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");

/* GET object listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM objects", []);
  res.json({ objects: rows });
});

/* POST object creating. */
router.post("/", async (req, res, next) => {
  const { body: object } = req;
  const {rowCount} = await db.query("INSERT INTO objects (object) VALUES ($1)", [
    object.object,
  ]);
  res.json({ message: "Objeto creado!"});
});

/* PUT object updating. */
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body: object } = req;
  const {rowCount} = await db.query("UPDATE objects SET object=$1 WHERE id=$2", [
    object.object,
    id,
  ]);
  res.json({ message: `Objeto ${id} actualizado!`});
});

/* DELETE object deleting. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await db.query("DELETE FROM objects WHERE id=$1", [id]);
  res.json({ message: `Objeto ${id} eliminado!`});
});

module.exports = router;
