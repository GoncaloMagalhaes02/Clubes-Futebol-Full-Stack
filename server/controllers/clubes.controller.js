const Clube = require("../models/clubes.model.js");

exports.insert = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo do clube deve estar definido.",
    });
  }

  const imageFileName = req.file ? req.file.filename : null;

  const Clube = new Clube({
    nomeClube: req.body.nomeClube,
    anoFundacao: req.body.anoFundacao,
    cidade: req.body.cidade,
    estadio: req.body.estadio,
    treinador: req.body.treinador,
    img: imageFileName,
  });

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

exports.updateClube = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "O conteúdo do clube não pode estar vazio!"
        });
        return;
    }

    if (req.file) {
        req.body.img = req.file.filename; 
    }

    Clube.updateClube(req.params.id_clube, req.body, (err, data) => {
        if (err) {
            if (err.clube === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado nenhum clube com o id ${req.params.id_clube}.`
                });
            } else if (err.clube === "no_changes") {
                res.status(400).send({
                    message: "Nenhum dado válido foi enviado para atualização."
                });
            } else {
                res.status(500).send({
                    message: "Erro ao atualizar o clube com o id " + req.params.id_clube
                });
            }
        } else {
            // Sucesso! Retorna os dados atualizados
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id_clube;

    Clube.delete(id, (err, data) => {
        if (err) {
            if (err.clube === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado nenhum clube com o id ${id}.`
                });
            } else {
                res.status(500).send({
                    message: `Erro ao eliminar o clube com o id ${id}.`
                });
            }
        } else {
            res.send({ message: `O clube com o id ${id} foi eliminado com sucesso!` });
        }
    });
};