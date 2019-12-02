const express = require("express");
const app = express();
require("dotenv").config();
const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require("mongodb-stitch-server-sdk");
// const {
//   Stitch,
//   RemoteMongoClient,
//   AnonymousCredential
// } = require('mongodb-stitch-react-native-sdk');
const client = Stitch.initializeDefaultAppClient("group4proj-kjjhf");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("Group4Project");

client.auth
  .loginWithCredential(new AnonymousCredential())
  // .then(user =>
  //   db
  //     .collection("events")
  //     .insertOne(
  //       { band: "Motorhead", location: "London", date: Date() }
  //     )
  .then(() =>
    db
      .collection("Group4")
      .find({}, { limit: 100 })
      .asArray()
  )
  .then(docs => {
    console.log("Found docs", docs);
  })
  .then(() =>
    db
      .collection("events")
      .find({}, { limit: 100 })
      .asArray()
  )
  .then(docs => {
    console.log("Found docs", docs);
  })
  .then(() =>
    db
      .collection("users")
      .find({}, { limit: 100 })
      .asArray()
  )
  .then(docs => {
    console.log("Found docs", docs);
    console.log("[MongoDB Stitch] Connected to Stitch");
  })
  .catch(err => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("MongoDB is connected");
  console.log("YOUR EXPRESS BACKEND IS CONNECTED TO REACT");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
