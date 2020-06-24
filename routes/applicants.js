var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");
const { applicantSchema } = require("../utils/schemas/applicants");
const validation = require("../utils/middlewares/validationHandler");

/* GET applicants listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM applicants", []);
  res.json({ applicants: rows });
});

/* POST applicants creating. */
router.post("/", validation(applicantSchema), async (req, res, next) => {
  const { body: applicant } = req;
  const {
    rowCount,
  } = await db.query("INSERT INTO applicants (applicant) VALUES ($1)", [
    applicant.applicant,
  ]);
  res.json({ message: "Solicitante creado!" });
});

/* PUT applicants updating. */
router.put("/:id", validation(applicantSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body: applicant } = req;
  const {} = await db.query("UPDATE applicants SET applicant=$1 WHERE id=$2", [
    applicant.applicant,
    id,
  ]);
  res.json({ message: `Solicitante ${id} actualizado!` });
});

/* DELETE applicants deleting. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {} = db.query("DELETE FROM applicants WHERE id=$1", [id]);
  res.json({ message: `Solicitante ${id} eliminado!` });
});

module.exports = router;
