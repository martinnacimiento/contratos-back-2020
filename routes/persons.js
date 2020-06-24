var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");
const { personSchema } = require("../utils/schemas/persons");
const validation = require("../utils/middlewares/validationHandler");

/* GET persons listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM persons", []);
  res.json({ persons: rows });
});

/* POST persons creating. */
router.post("/", validation(personSchema), async (req, res, next) => {
  const { body: person } = req;
  const response = await db.query(
    "INSERT INTO persons (surname, name, dni, domicile, mail, telephone, date_birth, cuit, sex_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      person.surname,
      person.name,
      person.dni,
      person.domicile,
      person.mail,
      person.telephone,
      person.date_birth,
      person.cuit,
      person.sex_id,
    ]
  );
  res.json({ message: "Persona creada!" });
});

/* PUT persons updating. */
router.put("/:id", validation(personSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body: person } = req;
  const {
    rowCount,
  } = await db.query(
    "UPDATE persons SET surname=$1, name=$2, dni=$3, domicile=$4, mail=$5, telephone=$6, date_birth=$7, cuit=$8, sex_id=$9 WHERE id=$10",
    [
      person.surname,
      person.name,
      person.dni,
      person.domicile,
      person.mail,
      person.telephone,
      person.date_birth,
      person.cuit,
      person.sex_id,
      id,
    ]
  );
  res.json({ message: `Persona ${id} actualizada!` });
});

/* DELETE persons deleting. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rowCount } = await db.query("DELETE FROM persons WHERE id=$1", [id]);
  res.json({ message: `Persona ${id} eliminada!` });
});

module.exports = router;
