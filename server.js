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

// client.auth
//   .loginWithCredential(new AnonymousCredential())
//   // .then(user =>
//   //   db
//   //     .collection("events")
//   //     .insertOne(
//   //       { band: "Motorhead", location: "London", date: Date() }
//   //     )
//   .then(() =>
//     db
//       .collection("Group4")
//       .find({}, { limit: 100 })
//       .asArray()
//   )
//   .then(docs => {
//     console.log("Found docs", docs);
//   })
//   .then(() =>
//     db
//       .collection("events")
//       .find({}, { limit: 100 })
//       .asArray()
//   )
//   .then(docs => {
//     console.log("Found docs", docs);
//   })
//   .then(() =>
//     db
//       .collection("users")
//       .find({}, { limit: 100 })
//       .asArray()
//   )
//   .then(docs => {
//     console.log("Found docs", docs);
//     console.log("[MongoDB Stitch] Connected to Stitch");
//   })
//   .catch(err => {
//     console.error(err);
//   });

app.get("/bands", (req, res) => {
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      db
        .collection("Group4")
        .find({}, { limit: 100 })
        .asArray()
    )
    .then(docs => {
      res.send(docs);
      console.log("Found docs", docs);
    });
});
app.get("/users", (req, res) => {
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      db
        .collection("users")
        .find({}, { limit: 100 })
        .asArray()
    )
    .then(docs => {
      res.send(docs);
      console.log("Found docs", docs);
    });
});
app.get("/events", (req, res) => {
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      db
        .collection("events")
        .find({}, { limit: 100 })
        .asArray()
    )
    .then(docs => {
      res.send(docs);
      console.log("Found docs", docs);
    });
});
app.post("/bands/:id", (req, res) => {
  const data = Object.assign({}, req.body, {
    created: new Date(),
    updated: new Date()
  });
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      collection("Group4")
        .insertOne(data)
        .then(doc => res.send(200, doc.ops[0]))
        .catch(err => res.send(500, err))
    )
    .then(() => res.send(docs));
});
app.post("/users/:id", (req, res) => {
  const data = Object.assign({}, req.body, {
    created: new Date(),
    updated: new Date()
  });
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      collection("Group4")
        .insertOne(data)
        .then(doc => res.send(200, doc.ops[0]))
        .catch(err => res.send(500, err))
    )
    .then(() => res.send(docs));
});
app.post("/events/:id", (req, res) => {
  const data = Object.assign({}, req.body, {
    created: new Date(),
    updated: new Date()
  });
  client.auth
    .loginWithCredential(new AnonymousCredential())
    .then(() =>
      collection("Group4")
        .insertOne(data)
        .then(doc => res.send(200, doc.ops[0]))
        .catch(err => res.send(500, err))
    )
    .then(() => res.send(docs));
});
app.delete("/bands/:id", (req, res) => {
  client.auth.loginWithCredential(new AnonymousCredential());
  collection("Group4")
    .findOneAndDelete({ _id: req.params.id })
    .then(doc => res.send(204))
    .catch(err => res.send(500, err));
});
app.delete("/users/:id", (req, res) => {
  client.auth.loginWithCredential(new AnonymousCredential());
  collection("users")
    .findOneAndDelete({ _id: req.params.id })
    .then(doc => res.send(204))
    .catch(err => res.send(500, err));
});
app.delete("/events/:id", (req, res) => {
  client.auth.loginWithCredential(new AnonymousCredential());
  collection("events")
    .findOneAndDelete({ _id: req.params.id })
    .then(doc => res.send(204))
    .catch(err => res.send(500, err));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
