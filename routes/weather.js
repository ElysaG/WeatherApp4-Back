

var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const City = require("../models/cities");

const OWM_API_KEY = process.env.OWM_API_KEY;

router.post("/", (req, res) => {
  console.log("post appelée");
  
  const MAX_CITIES = 20;

  // Vérifier le nombre actuel de villes
  City.countDocuments().then((count) => {
    if (count >= MAX_CITIES) {
      return res.json({
        result: false,
        error:
          "Limite maximale de 20 villes atteinte. Veuillez en supprimer une",
      });
    }

    // Vérifier si la ville existe déjà
    return City.findOne({
      cityName: { $regex: new RegExp(req.body.cityName, "i") },
    }).then((existingCity) => {
      if (existingCity && existingCity._id) {
        return res.json({
          result: false,
          error: "Cette ville est déjà enregistrée",
        });
      }

      // Appel API OpenWeatherMap

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${OWM_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((apiData) => {
          // Enregistrer en BDD
          const newCity = new City({
            cityName: req.body.cityName,
            main: apiData.weather[0].main,
            description: apiData.weather[0].description,
            tempMin: apiData.main.temp_min,
            tempMax: apiData.main.temp_max,
          });

          newCity
            .save()
            .then((savedCity) =>
              res.json({ result: true, weather: savedCity })
            );
        })

        .catch((err) => {
          console.error("Erreur ajout ville :", err);
          res.json({ result: false, error: "Erreur interne serveur (catch)" });
        });
    });
  });
});


router.get("/", (req, res) => {
  City.find().then((data) => {
    res.json({ weather: data });
  });
});

router.get("/:cityName", (req, res) => {
  City.findOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

router.delete("/:cityName", (req, res) => {
  City.deleteOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      // document successfully deleted
      City.find().then((data) => {
        res.json({ result: true, weather: data });
      });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

module.exports = router;
