const express = require("express");
require("./connection");
const Routerss = require("./router")
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());


app.use(Routerss)




app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})