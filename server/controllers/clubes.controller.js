const Clube = require("../models/clubes.model.js");


exports.insert = (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "O conteúdo do clube deve estar definido."
        });
    }

    const imageFileName = req.file ? req.file.filename : null;

        const clube = new Clube({
            nomeClube: req.body.nomeClube,
            anoFundacao: req.body.anoFundacao,
            cidade: req.body.cidade,
            estadio: req.body.estadio,
            treinador: req.body.treinador,
            img: imageFileName
        });
    

    Clube.insert(clube, (err, data) => {
    if(err){
        res.status(500).send({
            message: 
                err.message || "Ocorrei um erro ao inserir o clube..."
        });
    }else{
        res.send(data);
    }
});
};

exports.getAll = (req, res) => {
    const title = req.query.title;

    Clube.getAll(title, (err, data) => {
        if(err)
            res.status(500).send({
                message : 
                    err.message || "Ocorreu um erro na obtenção dos clubes" 
            });
            else res.send(data)
    });
}

exports.getById = (req, res) => {
    Clube.getById(req.params.id_clube, (err, data) => {
        if(err){
            if(err.clube === "not_found"){
                res.status(404).send({
                    message: `Nao foi encontrado nenhum clube com o id ${req.params.id_clube}.` 
                })
            }
        }else res.send(data);
    })
}

exports.update = (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0){ 
        res.status(400).send({
            message: "O contéudo do clube tem de estar definido!"
        });
        return; 
    }

    // 1. Verificar se um novo ficheiro foi enviado
    if (req.file) {
        // Se um novo ficheiro for enviado, adicione o caminho ao corpo do pedido
        req.body.img = req.file.filename; // CORREÇÃO: Adicionar a imagem ao corpo
    }

    Clube.updateClube(req.params.id_clube, req.body, (err,data) => {
        if(err) {
            if(err.clube === "not_found"){
                res.status(404).send({
                    message: `Não foi encontrado nenhum clube com o id = ${req.params.id_clube}.` // Corrigi a variável id_clube
                });
            } else{
                res.status(500).send({
                    message: `Erro ao atualizar os dados do clube com o id = ${req.params.id_clube}`
                });
            }
        }else {
            res.send(data);
        }
    });
}

exports.delete = (req, res) => {
    const id = req.params.id_clube;

    Clube.getById(id, (err, data) => {
        if(err){
            if(err.clube === "not_found"){
                res.status(404).send({
                    message: `Não foi encontrado nenhum clube com o id ${id}.`
                })
            }else{
                res.status(500).send({
                    message: `Erro ao procurar o clube com o id ${id}!`
                })
            } 
            return;
        }

        Clube.delete(id, (err, result) => {
            if(err){
                res.status(500).send({
                    message: `Erro ao apagar o clube com o id ${id}`
                })
            }else res.send({ message: 'O clube foi eliminado com sucesso!'})
        })


    })
}