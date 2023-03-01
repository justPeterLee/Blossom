const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const axios = require("axios");
/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  const perenual_key = process.env.PERENUAL_KEY;
  const data = {
    api_key: process.env.PLANT_ID_KEY,
    images: [req.body],
  };

  axios
    .post(`https://api.plant.id/v2/identify`, data)
    .then((response) => {
      axios
        .get(
          `https://perenual.com/api/species-list?page=1&key=${perenual_key}&q=${response.data.suggestions[0].plant_name}`
        )
        .then((responsNext) => {
          axios
            .get(
              `https://perenual.com/api/species/details/${responsNext.data.data[0].id}?key=${perenual_key}`
            )
            .then((newResponse) => {
              console.log(newResponse.data);
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log("error with getting deatailed plant, ", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("error with getting  general plant info, ", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("error with getting identifying plant, ", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
