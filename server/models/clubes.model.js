const sql = require("./db.model.js");

const Clube = function(clube){
    this.nomeClube = clube.nomeClube;
    this.anoFundacao = clube.anoFundacao;
    this.cidade = clube.cidade;
    this.estadio = clube.estadio;
    this.img = clube.img;
}

Clube.insert = (newClube, result) => {
    sql.query(`INSERT INTO movies SET ?`, newClube, (err, res) => {
        if(err){
            console.log('error', err);
            result(err, null);
            return;
        }
        console.log("Clube inserido: ", {id: res.id_clube, ... newClube});
        result(null, {id: res.id_clube, ... newClube});
    })
}


Clube.getAll = (title, result) =>{
    let query;
    query = 'SELECT * FROM clubes';

    if(title){
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if(err){
            console.log('error: ', err);
            result(null, err);
            return;
        }

      console.log("Clubes: ", res);
      result(null, res);  
    })


};

Clube.getById = (id_clube, result) => {
    sql.query(`SELECT * FROM clubes WHERE id_clube = ${id_clube}`, (err, res) => {
        if(err){
            console.log('error: ', err);
            console.log(`${id_clube}`)
            result(err, null);
            return
        }

        if(res.length){
            console.log('Clube encontrado: ', res[0]);
            result(null, res[0]);
            return
        }

        result({clube: "not_found"}, null);
    })
}

module.exports = Clube;
