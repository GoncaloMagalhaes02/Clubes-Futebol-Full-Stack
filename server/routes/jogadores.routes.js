module.exports = (app) => {
  const jogador = require("../controllers/jogadores.controller");
  let router = require("express").Router();

  /**
   * @swagger
   * /jogadores:
   *   get:
   *     summary: Retorna todos os jogadores
   *     tags: [Jogadores]
   *     responses:
   *       200:
   *         description: Lista de jogadores
   */

  router.get("/", jogador.listAll);
  /**
   * @swagger
   * /jogadores/{id_jogador}:
   *   get:
   *     summary: Retorna um jogador pelo ID
   *     tags: [Jogadores]
   *     parameters:
   *       - in: path
   *         name: id_jogador
   *         required: true
   *         description: ID do jogador a ser consultado
   *     responses:
   *       200:
   *         description: Detalhes do jogador
   */

  router.get("/:id", jogador.findById);

  /**
   * @swagger
   * /jogadores:
   *   post:
   *     summary: Insere um novo Jogador
   *     tags: [Jogadores]
   *     requestBody:
   *       description: Jogador a ser adicionado
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 description: Nome do Jogador
   *                 example: "Cristiano Ronaldo"
   *               nacionalidade:
   *                 type: string
   *                 description: Nacionalidade do Jogador
   *                 example: "Portugal"
   *               dataNascimento:
   *                 type: date
   *                 description: Data de Nascimento do Jogador
   *                 example: "1985-02-05"
   *               posicao:
   *                 type: string
   *                 description: Posição do Jogador
   *                 example: "Atacante || Médio || Defesa || Guarda-Redes"
   *               numCamisola:
   *                 type: integer
   *                 description: Número da Camisola do Jogador
   *                 example: 7
   *               id_clube:
   *                 type: integer
   *                 description: ID do Clube do Jogador
   *                 example: 1
   *     responses:
   *       '200':
   *         description: Jogador criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 nome:
   *                   type: string
   *                   description: Nome do Jogador
   *                   example: "Cristiano Ronaldo"
   *                 nacionalidade:
   *                   type: string
   *                   description: Nacionalidade do Jogador
   *                   example: "Portugal"
   *                 dataNascimento:
   *                   type: date
   *                   description: Data de Nasciemnto do Jogador
   *                   example: "1985-02-05"
   *                 posicao:
   *                   type: string
   *                   description: Posição do Jogador
   *                   example: "Atacante"
   *                 numCamisola:
   *                   type: integer
   *                   description: Número da Camisola do Jogador
   *                   example: 7
   *                 id_clube:
   *                   type: integer
   *                   description: ID do Clube do Jogador
   *                   example: 1
   */
  router.post("/", jogador.insert);

  /**
   * @swagger
   * /jogadores/{id_jogador}:
   *   delete:
   *     summary: Apaga o Jogador pelo ID
   *     tags: [Jogadores]
   *     parameters:
   *       - in: path
   *         name: id_jogador
   *         required: true
   *         description: ID do jogador a ser apagado
   *     responses:
   *       200:
   *         description: Jogador apagado
   */

  router.delete("/:id", jogador.delete);

  /**
   * @swagger
   * /jogadores/{id_jogador}:
   *   patch:
   *     summary: Atualizar um Jogador pelo ID
   *     tags: [Jogadores]
   *     parameters:
   *       - in: path
   *         name: id_jogador
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do jogador para atualizar
   *     requestBody:
   *       description: O que atualizar do Jogador. Apenas preencha os campos que deseja atualizar!
   *       required: false
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 description: Nome do Jogador
   *                 example: ""
   *               nacionalidade:
   *                 type: string
   *                 description: Nacionalidade do Jogador
   *                 example: ""
   *               dataNascimento:
   *                 type: date
   *                 description: Data de Nascimento do Jogador
   *                 example: ""
   *               posicao:
   *                 type: string
   *                 description: Posição do Jogador
   *                 example: ""
   *               numCamisola:
   *                 type: integer
   *                 description: Número da Camisola do Jogador
   *                 example: ""
   *               id_clube:
   *                 type: integer
   *                 description: ID do Clube do Jogador
   *                 example: ""
   *     responses:
   *       '200':
   *         description: Jogador Atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id_jogador:
   *                   type: integer
   *                   description: ID do Jogador
   *                   example: 56
   *                 nome:
   *                   type: string
   *                   description: Nome do Jogador
   *                   example: "Cristiano Ronaldo"
   *                 dataNascimento:
   *                   type: date
   *                   description: Data de Nascimento do Jogador
   *                   example: "1985-02-05"
   *                 posicao:
   *                   type: string
   *                   description: Posição do Jogador
   *                   example: "Atacante"
   *                 numCamisola:
   *                   type: integer
   *                   description: Número da Camisola do Jogador
   *                   example: 7
   *                 id_clube:
   *                   type: integer
   *                   description: ID do Clube do Jogador
   *                   example: 1
   */

  router.patch("/:id_jogador", jogador.update);

  app.use("/jogadores", router);
};
