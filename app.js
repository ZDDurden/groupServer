const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zddurden:<password>@cluster0-hamuy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//app.use("/assets", express.static("assets"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/snakegame", function(req, res) {
  console.log(req.body.name);
  res.sendFile(__dirname + "/views/snakegame.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
