module.exports = app => {
    const clubes = require("../controllers/clubes.controller.js");

    let router = require("express").Router();

    router.get("/", clubes.getAll);

    router.get("/getById/:id_clube", clubes.getById);

    app.use('/clubes', router);
}


