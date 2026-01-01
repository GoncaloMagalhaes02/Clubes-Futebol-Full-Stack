const sql = require("./db.model");

const Jogador = function (jogador) {
  this.nome = jogador.nome;
  this.nacionalidade = jogador.nacionalidade;
  this.dataNascimento = jogador.dataNascimento;
  this.posicao = jogador.posicao;
  this.numCamisola = jogador.numCamisola;
  this.id_clube = jogador.id_clube;
};

Jogador.insert = (newJogador, result) => {
  if (
    newJogador.posicao === "Guarda-Redes" ||
    newJogador.posicao === "Defesa" ||
    newJogador.posicao === "Médio" ||
    newJogador.posicao === "Avançado"
  ) {
    sql.query("INSERT INTO jogadores SET ?", newJogador, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      console.log("Jogador criado: ", { id: res.insertId, ...newJogador });
      result(null, { id: res.insertId, ...newJogador });
    });
  } else {
    console.log("Posição inválida para o jogador:", newJogador.posicao);
    result({ message: "Posição inválida para o jogador." }, null);
  }
};

Jogador.listAll = (result) => {
  sql.query(
    "SELECT jogadores.*, clubes.nomeClube FROM jogadores JOIN clubes ON jogadores.id_clube = clubes.id_clube",
    (err, res) => {
      if (err) {
        console.log("Erro ao ler jogadores: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Jogador.findById = (id, result) => {
  const query = `
    SELECT jogadores.*, Clubes.nomeClube, Clubes.img
    FROM jogadores 
    INNER JOIN Clubes ON jogadores.id_clube = Clubes.id_clube 
    WHERE jogadores.id_jogador = ?
  `;

  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Jogador.updateById = (id, partialJogadorData, result) => {
  const fieldsToUpdate = {};
  const validFields = [
    "nome",
    "nacionalidade",
    "dataNascimento",
    "posicao",
    "numCamisola",
    "id_clube",
  ];

  for (const key of validFields) {
    if (partialJogadorData[key] !== undefined) {
      fieldsToUpdate[key] = partialJogadorData[key];
    }
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    console.log("Nenhum campo fornecido para atualização.");
    result({ clube: "no_changes" }, null);
    return;
  }
  sql.query(
    "UPDATE jogadores SET ? WHERE id_jogador = ?",
    [fieldsToUpdate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ jogador: "not_found" }, null);
        return;
      }
      console.log("Jogador atualizado: ", {
        id_jogador: id,
        ...fieldsToUpdate,
      });
      result(null, { id_jogador: id, ...fieldsToUpdate });
    }
  );
};

Jogador.findByClube = (id_clube, result) => {
  sql.query("SELECT * FROM jogadores WHERE id_clube = ?", id_clube, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Jogador.delete = (id, result) => {
  sql.query(`DELETE FROM jogadores WHERE id_jogador = ? `, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ message: "Não foi possivel apagar o Jogador" }, null);
    }
    result(null, { message: "Jogador eliminado com sucesso." });
  });
};

module.exports = Jogador;
