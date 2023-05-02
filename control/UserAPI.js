const express = require("express")
const router = express.Router();

const {sucess, fail} = require("../config/resposta")
const UsersDAO = require("../models/User")

router.get("/", (req, res) => {
    UsersDAO.list().then((users) => {
        res.json(sucess(users, "list"))
    })
})


router.get("/:id", (req, res) => {
    UsersDAO.getById(req.params.id).then(user => {
        res.json(sucess(user))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar o usuário"))
    })
})

router.post("/", (req, res) => {
    const {nome, cpf, idade} = req.body

    //TODO validar os campos
    console.log(req.body)
    UsersDAO.insert(nome, cpf, idade).then(user => {
        res.json(sucess(user))


    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo usuário"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {nome, cpf, idade} = req.body

    //TODO validar os campos
    let obj = {}
    if (nome) obj.nome = nome
    if (cpf) obj.cpf = cpf
    if (idade) obj.idade = idade

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    UsersDAO.update(id, obj).then(user => {
        if (user)
            res.json(sucess(user))
        else
            res.status(500).json(fail("Usuário não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar o usuário"))
    })
})

router.delete("/:id", (req, res) => {
    UsersDAO.delete(req.params.id).then(user => {
        if (user)
            res.json(sucess(user))
        else
            res.status(500).json(fail("usuário não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o usuário"))
    })
})

module.exports = router;