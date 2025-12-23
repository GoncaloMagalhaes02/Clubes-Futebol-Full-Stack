const Jogador = require("../models/jogadores.model");

//Inserir novo Jogador
exports.insert = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "O conteúdo não pode ser vazio!" });
    return;
  }

  const jogador = new Jogador({
    ...req.body,
  });

  Jogador.insert(jogador, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar o Jogador.",
      });
    } else {
      res
        .status(200)
        .send({ message: "Jogador Criado com sucesso", jogador: data });
    }
  });
};

exports.listAll = (_, res) => {
  Jogador.listAll((err, data) => {
    if (err) {
      res.status(500).json({ message: "Erro", err });
    } else {
      res.status(200).send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  Jogador.findById(id, (err, data) => {
    if (err) {
      res.status(400).json({ message: "Jogador não encontrado!" }, err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Jogador.delete(id, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Não foi possivel eliminar o jogador." });
    } else {
      res.status(200).json({ message: "Jogador eliminado com sucesso!" });
    }
  });
};
