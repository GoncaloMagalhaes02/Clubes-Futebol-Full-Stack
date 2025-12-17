const Clube = require("../models/clubes.model.js");

exports.insert = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo do clube deve estar definido.",
    });
  }

  const { file, ...rest } = req.body;

  const clube = new Clube({
    ...rest,
    img: req.file,
  });

  Clube.insert(clube, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorrei um erro ao inserir o clube...",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getAll = (req, res) => {
  const title = req.query.title;

  Clube.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção dos clubes",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  Clube.getById(req.params.id_clube, (err, data) => {
    if (err) {
      if (err.clube === "not_found") {
        res.status(404).send({
          message: `Nao foi encontrado nenhum clube com o id ${req.params.id_clube}.`,
        });
      }
    } else res.send(data);
  });
};
