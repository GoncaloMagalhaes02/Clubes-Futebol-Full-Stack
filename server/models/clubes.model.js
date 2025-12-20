const sql = require("./db.model.js");

const Clube = function(clube){
    this.nomeClube = clube.nomeClube;
    this.anoFundacao = clube.anoFundacao;
    this.cidade = clube.cidade;
    this.estadio = clube.estadio;
    this.treinador = clube.treinador;
    this.img = clube.img;
}

Clube.insert = (newClube, result) => {
    sql.query(`INSERT INTO clubes SET ?`, newClube, (err, res) => {
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

Clube.updateClube = (id_clube, partialClubeData, result) => {

    const fieldsToUpdate = {};
    
    // Lista de campos válidos na tabela clubes
    const validFields = ['nomeClube', 'anoFundacao', 'cidade', 'estadio', 'treinador', 'img']; 

    for (const key of validFields) {
        // Se o campo existir no corpo do pedido, adicione-o ao objeto de atualização
        if (partialClubeData[key] !== undefined) {
            fieldsToUpdate[key] = partialClubeData[key];
        }
    }

    // 2. Verificar se há realmente algo para atualizar
    if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("Nenhum campo fornecido para atualização.");
        result({ clube: "no_changes"}, null); 
        return;
    }

    // 3. Executar a query dinâmica
    // O '?' na cláusula SET será substituído pelo objeto fieldsToUpdate de forma dinâmica e segura.
    sql.query('UPDATE clubes SET ? WHERE id_clube = ?',
        [fieldsToUpdate, id_clube],
        (err, res) => {
            if(err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0){
                // Se o ID não existir
                result({ clube: "not_found"}, null);
                return;
            }

            // Sucesso: Retornamos os dados atualizados (o ID e os campos que foram alterados)
            console.log('Clube atualizado: ', {id_clube: id_clube, ...fieldsToUpdate});
            result(null, {id_clube: id_clube, ...fieldsToUpdate});
        }
    );
};

Clube.delete = (id_clube, result) => {
    sql.query('DELETE FROM clubes WHERE id_clube = ?', id_clube, (err, res) => {
        if(err){
            console.log('error: ', err);
            result(null, err);
            return
        }

        if(res.affectedRows == 0){
            result({ clube: "not_found"}, null);
            return;
        }
        console.log(`Clube com o id ${id_clube} foi eliminado`);
        result(null, res);
    })
}




module.exports = Clube;
