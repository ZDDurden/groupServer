const express = require("express");
const app = express();
const moment = require("moment");
require("dotenv").config();
const { ObjectID } = require("mongodb");

const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require("mongodb-stitch-server-sdk");

const client = Stitch.initializeDefaultAppClient("group4proj-kjjhf");

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("Group4Project");

app.use(express.json());

module.exports = function(app) {
  //Get routes

  app.get("/", (req, res) => {
    res.send("Welcome to Bander");
  });
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
      });
  });

  //Get from ObjectId

  app.get("/bands/:id", (req, res) => {
    const id = req.params.id;
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("Group4")
          .findOne({ _id: ObjectID(id) })
          .then(result => {
            if (result) {
              res.send(result);
            } else {
              console.log("No document matches the provided query.");
            }
          })
          .catch(err => console.error(`Failed to find document: ${err}`));
      })
      .catch(err => console.log(err));
  });
  app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("users")
          .findOne({ _id: ObjectID(id) })
          .then(result => {
            if (result) {
              res.send(result);
            } else {
              console.log("No document matches the provided query.");
            }
          })
          .catch(err => console.error(`Failed to find document: ${err}`));
      })
      .catch(err => console.log(err));
  });
  app.get("/events/:id", (req, res) => {
    const id = req.params.id;
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("events")
          .findOne({ _id: ObjectID(id) })
          .then(result => {
            if (result) {
              res.send(result);
            } else {
              console.log("No document matches the provided query.");
            }
          })
          .catch(err => console.error(`Failed to find document: ${err}`));
      })
      .catch(err => console.log(err));
  });

  //Post routes

  app.post("/bands", (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      genre: req.body.genre,
      bio: req.body.bio,
      spotify: req.body.spotify,
      social: req.body.social
    };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() =>
        db
          .collection("Group4")
          .insertOne(data)
          .then(doc => res.send(200, doc.ops[0]))
          .catch(err => res.send(500, err))
      )
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
  app.post("/users", (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      location: req.body.location,
      likes: req.body.likes,
      pic: req.body.pic,
      bands: req.body.bands,
      genres: req.body.genres
    };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() =>
        db
          .collection("users")
          .insertOne(data)
          .then(doc => res.send(200, doc.ops[0]))
          .catch(err => res.send(500, err))
      )
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });
  app.post("/events", (req, res) => {
    const data = {
      band: req.body.band,
      location: req.body.location,
      date: moment().format(req.body.date)
    };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() =>
        db
          .collection("events")
          .insertOne(data)
          .then(doc => res.send(200, doc.ops[0]))
          .catch(err => res.send(500, err))
      )
      .then(data => res.send(data))
      .catch(err => console.log(err));
  });

  //Put routes

  app.put("/bands/:id", (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      genre: req.body.genre,
      bio: req.body.bio,
      spotify: req.body.spotify,
      social: req.body.social
    };
    let query = { _id: ObjectID(req.params.id) },
      body = { $set: data },
      opts = {
        returnOriginal: false,
        upsert: true
      };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("Group4")
          .findOneAndUpdate(query, body, opts)
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });
  app.put("/users/:id", (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      location: req.body.location,
      likes: req.body.likes,
      pic: req.body.pic,
      bands: req.body.bands,
      genres: req.body.genres
    };
    let query = { _id: ObjectID(req.params.id) },
      body = { $set: data },
      opts = {
        returnOriginal: false,
        upsert: true
      };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("users")
          .findOneAndUpdate(query, body, opts)
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });
  app.put("/events/:id", (req, res) => {
    const data = {
      band: req.body.band,
      location: req.body.location,
      date: req.body.date
    };
    let query = { _id: ObjectID(req.params.id) },
      body = { $set: data },
      opts = {
        returnOriginal: false,
        upsert: true
      };
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("events")
          .findOneAndUpdate(query, body, opts)
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });

  //Delete routes

  app.delete("/bands/:id", (req, res) => {
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("Group4")
          .findOneAndDelete({ _id: ObjectID(req.params.id) })
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });
  app.delete("/users/:id", (req, res) => {
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("users")
          .findOneAndDelete({ _id: ObjectID(req.params.id) })
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });
  app.delete("/events/:id", (req, res) => {
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        db.collection("events")
          .findOneAndDelete({ _id: ObjectID(req.params.id) })
          .then(doc => res.send(204))
          .catch(err => res.send(500, err));
      })
      .catch(err => console.log(err));
  });
};
