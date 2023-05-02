const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nome: String,
    cpf: Number,
    idade: Number
})

const UserModel = mongoose.model("User", UserSchema)


module.exports = {
  list: async function() {
    const users = await UserModel.find({}).lean()
    return users
  },
  insert: async function (nome, cpf, idade) {
    const user = new UserModel({
      nome: nome,
      cpf: cpf,
      idade: idade
    })
    await user.save()
    return user
  },

  delete: async function(id) {
    return await UserModel.findByIdAndDelete(id)
  },
  update: async function(id, obj) {

    let user = await UserModel.findById(id)
    if (!user) {
        return false
    }
    
    Object.keys(obj).forEach(key => user[key] = obj[key])
    await user.save()
    return user
  },
  getById: async function(id) {
    return await UserModel.findById(id).lean()
  }
}