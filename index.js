const express = require("express");
const path = require("path")
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./config/mongo'))
app.use("/users", require("./control/UserAPI"))


app.listen(3000, () => {
    console.log("Escutando..")
})