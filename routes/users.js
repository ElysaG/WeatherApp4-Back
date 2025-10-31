var express = require("express");
var router = express.Router();
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

// Inscription
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body; //destructuring

  // On vérifie que la data est valide
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return; //indispensable, sinon il continue , renvoie erreur: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  }
  // Vérifie si le user existe deja
  User.findOne({ email }).then((data) => {
    // On vérifie s'il est enregistré :
    if (data) {
      res.json({ result: false, error: "User already exists" });
      return; //indispensable, sinon il continue, renvoie erreur: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

      // si il n'a pas été trouvé, on crée un new User et on enregistre
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save().then(() => {
        res.json({ result: true });
      });
    }
  });
});

// Connection
router.post("/signin", (req, res) => {
  const { email, password } = req.body; //destructuring

  // On vérifie si les éléments existent
  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  User.findOne({ email, password }).then((data) => {
    if (data) {
      // User enregistré
      res.json({ result: true });
    } else {
      // User non trouvé, data vide
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
