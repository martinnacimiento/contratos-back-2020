var express = require("express");
var router = express.Router();
const db = require("../lib/postgre");
const {
  createContractSchema,
  updateContractSchema,
} = require("../utils/schemas/contracts");
const validation = require("../utils/middlewares/validationHandler");

/* GET contracts listing. */
router.get("/", async (req, res, next) => {
  const { rows } = await db.query("SELECT * FROM contracts", []);
  res.json({ contracts: rows });
});

/* POST contracts creating. */
router.post("/", validation(createContractSchema), async (req, res, next) => {
  const { body: contract } = req;
  const response = await db.query(
    "INSERT INTO contracts (date_from, date_until, number_order, reason, attached, created_at, updated_at, state_id, applicant_id, object_id, person_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
    [
      new Date(contract.date_from).toJSON(),
      new Date(contract.date_until).toJSON(),
      contract.number_order,
      contract.reason,
      contract.attached,
      new Date().toJSON(), // created_at
      contract.updated_at,
      contract.state_id,
      contract.applicant_id,
      contract.object_id,
      contract.person_id,
    ]
  );
  res.json({ message: "Contrato creado!" });
});

/* PUT contracts updating. */
router.put("/:id", validation(updateContractSchema), async (req, res, next) => {
  const { id } = req.params;
  const { body: contract } = req;
  const {
    rowCount,
  } = await db.query(
    "UPDATE contracts date_from=$1, date_until=$2, number_order=$3, reason=$4, attached=$5, created_at=$6, updated_at=$7, state_id=$8, applicant_id=$9, object_id=$10, person_id=$11 WHERE id=$12",
    [
      contract.date_from,
      contract.date_until,
      contract.number_order,
      contract.reason,
      contract.attached,
      contract.created_at,
      contract.updated_at,
      contract.state_id,
      contract.applicant_id,
      contract.object_id,
      contract.person_id,
      id,
    ]
  );
  res.json({ message: `Contrato ${id} actualizado!` });
});

/* DELETE contracts deleting. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rowCount } = await db.query("DELETE FROM contracts WHERE id=$1", [
    id,
  ]);
  res.json({ message: `Contrato ${id} eliminado!` });
});

module.exports = router;
