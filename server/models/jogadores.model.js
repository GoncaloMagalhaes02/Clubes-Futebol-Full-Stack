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
  sql.query("INSERT INTO jogadores SET ?", newJogador, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }
    console.log("Jogador criado: ", { id: res.insertId, ...newJogador });
    result(null, { id: res.insertId, ...newJogador });
  });
};

Jogador.listAll = (result) => {
  sql.query("SELECT * FROM jogadores", (err, res) => {
    if (err) {
      console.log("Erro ao ler jogadores: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
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
    console.log("Jogador: ", res);
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
