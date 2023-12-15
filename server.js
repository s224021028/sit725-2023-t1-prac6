const express = require("express")
const app = express()
const router = require("./routers/router")
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/views"))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", router)
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(port)
})
module.exports = app