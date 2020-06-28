var express = require("express");
var router = express.Router();
const { idSchema } = require("../utils/schemas/general");
const { applicantSchema } = require("../utils/schemas/applicants");
const validation = require("../utils/middlewares/validationHandler");
const { Applicant } = require("../models");

/* GET applicants listing. */
router.get("/", async (req, res, next) => {
  const applicants = await Applicant.findAll();
  res.json({ applicants: applicants });
});

/* GET a applicant. */
router.get(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const applicant = await Applicant.findByPk(id);
    res.json({ applicant: applicant });
  }
);

/* POST applicants creating. */
router.post("/", validation(applicantSchema), async (req, res, next) => {
  const { body: applicant } = req;
  await Applicant.create(applicant);
  res.json({ message: "Solicitante creado!" });
});

/* PUT applicants updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(applicantSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;
    const applicant = await Applicant.findByPk(id);
    await applicant.update(data);
    res.json({ message: `Solicitante ${id} actualizado!` });
  }
);

/* DELETE applicants deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    await Applicant.destroy({ where: { id: id } });
    res.json({ message: `Solicitante ${id} eliminado!` });
  }
);

module.exports = router;
