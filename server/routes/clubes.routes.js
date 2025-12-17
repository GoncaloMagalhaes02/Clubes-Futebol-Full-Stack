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

    router.get("/getAllClubes", clubes.getAll);

    router.get("/getById/:id_clube", clubes.getById);

    router.post("/insertClube", upload.single('img'), clubes.insert);

    //O patch espera apenas as alterações
    router.patch("/updateClube/:id_clube", upload.single('img'), clubes.update);

    router.delete("/delete/:id_clube", clubes.delete);

    app.use('/clubes', router);
}


