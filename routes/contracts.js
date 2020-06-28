var express = require("express");
var router = express.Router();
const { idSchema } = require("../utils/schemas/general");
const {
  createContractSchema,
  updateContractSchema,
} = require("../utils/schemas/contracts");
const validation = require("../utils/middlewares/validationHandler");
const { Contract, Object, Person, Applicant, State } = require("../models");

/* GET contracts listing. */
router.get("/", async (req, res, next) => {
  const contracts = await Contract.findAll({
    include: [Object, Person, Applicant, State],
  });
  res.json({ contracts: contracts });
});

/* GET a contract. */
router.get(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const contract = await Contract.findByPk(id);
    res.json({ contract: contract });
  }
);

/* POST contracts creating. */
router.post("/", validation(createContractSchema), async (req, res, next) => {
  const { body: contract } = req;
  await Contract.create(contract);
  res.json({ message: "Contrato creado!" });
});

/* PUT contracts updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(updateContractSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;
    const contract = await Contract.findByPk(id);
    await contract.update(data);
    res.json({ message: `Contrato ${id} actualizado!` });
  }
);

/* DELETE contracts deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    await Contract.destroy({
      where: { id: id },
    });
    res.json({ message: `Contrato ${id} eliminado!` });
  }
);

module.exports = router;
