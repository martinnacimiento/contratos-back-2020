var express = require("express");
var router = express.Router();
const { idSchema } = require("../utils/schemas/general");
const { sexSchema } = require("../utils/schemas/sexes");
const validation = require("../utils/middlewares/validationHandler");
const { Sex } = require("../models");

/* GET sexes listing. */
router.get("/", async (req, res, next) => {
  const sexes = await Sex.findAll();
  res.json({ sexes: sexes });
});

/* GET a sex. */
router.get(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const sex = await Sex.findByPk(id);
    res.json({ sex: sex });
  }
);

/* POST sexes creating. */
router.post("/", validation(sexSchema), async (req, res, next) => {
  const { body: sex } = req;
  await Sex.create(sex);
  res.json({ message: "Sexo creado!" });
});

/* PUT sexes updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(sexSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;
    const sex = await Sex.findByPk(id);
    await sex.update(data);
    res.json({ message: `Sexo ${id} actualizado!` });
  }
);

/* DELETE sexes deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    await Sex.destroy({
      where: { id: id },
    });
    res.json({ message: `Sexo ${id} eliminado!` });
  }
);

module.exports = router;
