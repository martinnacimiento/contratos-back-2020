var express = require("express");
var router = express.Router();
const { idSchema } = require("../utils/schemas/general");
const { objectSchema } = require("../utils/schemas/objects");
const validation = require("../utils/middlewares/validationHandler");
const { Object } = require("../models");

/* GET object listing. */
router.get("/", async (req, res, next) => {
  const objects = await Object.findAll();
  res.json({ objects: objects });
});

/* GET a object. */
router.get(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const object = await Object.findByPk(id);
    res.json({ object: object });
  }
);

/* POST object creating. */
router.post("/", validation(objectSchema), async (req, res, next) => {
  const { body: object } = req;
  await Object.create(object);
  res.json({ message: "Objeto creado!" });
});

/* PUT object updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(objectSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;
    const object = await Object.findByPk(id);
    await object.update(data);
    res.json({ message: `Objeto ${id} actualizado!` });
  }
);

/* DELETE object deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    await Object.destroy({
      where: { id: id },
    });
    res.json({ message: `Objeto ${id} eliminado!` });
  }
);

module.exports = router;
