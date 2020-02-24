const express = require("express");
const bcrypt = require('bcryptjs')
const users = require("./user-model.js");
const router = express.Router();

router.get("/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get the users" });
    });
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/register", (req, res) => {
  const userData = req.body;
    const hash =bcrypt.hashSync(userData.password, 8)

    userData.password = hash
  users
    .add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  users
    .findById({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params.id;
  const changes = req.body;

  users
    .findById(id)
    .then(user => {
      if (user) {
        users.update(changes, id).then(updatedUser => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;