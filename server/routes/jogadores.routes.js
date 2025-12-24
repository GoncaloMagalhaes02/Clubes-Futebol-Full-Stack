module.exports = (app) => {
  const jogador = require("../controllers/jogadores.controller");
  let router = require("express").Router();

  router.get("/", jogador.listAll);

  router.post("/", jogador.insert);

  router.get("/:id", jogador.findById);

  router.delete("/:id", jogador.delete);

  router.put("/:id", jogador.update);

  app.use("/jogadores", router);
};
