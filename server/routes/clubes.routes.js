module.exports = app => {
    const clubes = require("../controllers/clubes.controller.js");
    const multer = require("multer");
    

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    const upload = multer({ storage: storage })

    let router = require("express").Router();

/**
   * @swagger
   * /clubes/getAllClubes:
   *   get:
   *     summary: Retorna todos os clubes
   *     tags: [Clubes]
   *     responses:
   *       200:
   *         description: Lista dos Clubes
   */
    router.get("/getAllClubes", clubes.getAll);


    /**
   * @swagger
   * /clubes/getById/{id_clube}:
   *   get:
   *     summary: Retorna o clube por Id
   *     tags: [Clubes]
   *     parameters:
   *       - in: path
   *         name: id_clube
   *         required: true
   *         description: ID do clube a ser consultado
   *     responses:
   *       200:
   *         description: Destalhes do clube
   */
    router.get("/getById/:id_clube", clubes.getById);

   /**
   * @swagger
   * /clubes/insertClube:
   *   post:
   *     summary: Insere um novo Clube
   *     tags: [Clubes]
   *     requestBody:
   *       description: Clube a ser adicionado
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               nomeClube:
   *                 type: string
   *                 description: nome do Clube
   *                 example: "SL Benfica"
   *               anoFundacao:
   *                 type: integer
   *                 description: Ano de Fundação do Clube
   *                 example: 1904
   *               cidade:
   *                 type: string
   *                 description: Cidade do Clube
   *                 example: "Lisboa"
   *               estadio:
   *                 type: string
   *                 description: Nome do estádio do Clube
   *                 example: "Estádio da Luz"
   *               treinador:
   *                 type: string
   *                 description: Nome do treinador do Clube
   *                 example: "José Mourinho"
   *               img:
   *                 type: string
   *                 format: binary
   *                 description: Ficheiro da imagem
   *                 example: "logoClube.png"
   * 
   *     responses:
   *       '200':
   *         description: Clube criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id_clube:
   *                   type: integer
   *                   description: ID do Clube criado
   *                   example: 56
   *                 nomeClube:
   *                   type: string
   *                   description: nome do Clube
   *                   example: "SL Benfica"
   *                 anoFundacao:
   *                   type: integer
   *                   description: Ano de Fundação do Clube
   *                   example: 1904
   *                 cidade:
   *                   type: string
   *                   description: Cidade do Clube
   *                   example: "Lisboa"
   *                 estadio:
   *                   type: string
   *                   description: Nome do estádio do Clube
   *                   example: "Estádio da Luz"
   *                 treinador:
   *                   type: string
   *                   description: Nome do treinador do Clube
   *                   Example: "José Mourinho"
   *                 img:
   *                   type: string
   *                   example: "logoClube.png"
   */
    router.post("/insertClube", upload.single('img'), clubes.insert);
    
   /**
   * @swagger
   * /clubes/updateClube/{id_clube}:
   *   patch:
   *     summary: Atualizar umClube
   *     tags: [Clubes]
   *     parameters:
   *       - in: path
   *         name: id_clube
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do clube para atualizar
   *     requestBody:
   *       description: O que atualizar do Clube
   *       required: false
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               nomeClube:
   *                 type: string
   *                 description: nome do Clube
   *                 example: "SL Benfica"
   *               anoFundacao:
   *                 type: integer
   *                 description: Ano de Fundação do Clube
   *                 example: 1904
   *               cidade:
   *                 type: string
   *                 description: Cidade do Clube
   *                 example: "Lisboa"
   *               estadio:
   *                 type: string
   *                 description: Nome do estádio do Clube
   *                 example: "Estádio da Luz"
   *               img:
   *                 type: string
   *                 format: binary
   *                 description: nome do ficheiro
   *                 example: "logoBenfica.png"
   *     responses:
   *       '200':
   *         description: Clube Atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id_clube:
   *                   type: integer
   *                   description: ID do Clube criado
   *                   example: 56
   *                 nomeClube:
   *                   type: string
   *                   description: nome do Clube
   *                   example: "SL Benfica"
   *                 anoFundacao:
   *                   type: integer
   *                   description: Ano de Fundação do Clube
   *                   example: 1904
   *                 cidade:
   *                   type: string
   *                   description: Cidade do Clube
   *                   example: "Lisboa"
   *                 estadio:
   *                   type: string
   *                   description: Nome do estádio do Clube
   *                   example: "Estádio da Luz"
   *                 img:
   *                   type: string
   *                   description: nome do ficheiro da imagem
   *                   example: "logoBenfica.png"
   */
    router.patch("/updateClube/:id_clube", upload.single('img'), clubes.updateClube);


   /**
   * @swagger
   * /clubes/delete/{id_clube}:
   *   delete:
   *     summary: Apaga o Clube
   *     tags: [Clubes]
   *     parameters:
   *       - in: path
   *         name: id_clube
   *         required: true
   *         description: ID do clube a ser apagado
   *     responses:
   *       200:
   *         description: Clube apagado
   */
    router.delete("/delete/:id_clube", clubes.delete);  

    
    app.use('/clubes', router);
}


