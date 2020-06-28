var express = require("express");
var router = express.Router();
const { idSchema } = require("../utils/schemas/general");
const { stateSchema } = require("../utils/schemas/states");
const validation = require("../utils/middlewares/validationHandler");
const { State } = require("../models");

/* GET states listing. */
router.get("/", async (req, res, next) => {
  const states = await State.findAll();
  res.json({ states: states });
});

/* GET a state. */
router.get(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const state = await State.findByPk(id);
    res.json({ state: state });
  }
);

/* POST states creating. */
router.post("/", validation(stateSchema), async (req, res, next) => {
  const { body: state } = req;
  await State.create(state);
  res.json({ message: "Estado creado!" });
});

/* PUT states updating. */
router.put(
  "/:id",
  validation({ id: idSchema }, "params"),
  validation(stateSchema),
  async (req, res, next) => {
    const { id } = req.params;
    const { body: data } = req;
    const state = await State.findByPk(id);
    await state.update(data);
    res.json({ message: `Estado ${id} actualizado!` });
  }
);

/* DELETE states deleting. */
router.delete(
  "/:id",
  validation({ id: idSchema }, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    await State.destroy({
      where: { id: id },
    });
    res.json({ message: `Estado ${id} eliminado!` });
  }
);

module.exports = router;
