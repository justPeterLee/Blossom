const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/* --------- GET --------- */

// Show Plants (GET)
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  if (req.isAuthenticated()) {
    const user = req.user;
    const queryText = `SELECT "plant"."plant_table_id", "plant"."plant_name", "plant_info"."scientific_name" FROM "plant_info" 
    JOIN "plant" ON "plant"."plant_info_id" = "plant_info"."plant_info_table_id" 
    JOIN "user" ON "user"."id" = "plant"."user_id"
    WHERE "user"."id" = $1 AND "plant"."user_id" = $2;`;
    pool
      .query(queryText, [user.id, user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing user plants: ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// Filter by Garden (GET)
router.get("/filter/garden/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const gardenId = req.params.id;
    const queryText = `SELECT * FROM "plant" WHERE "garden_id" = $1;`;

    pool
      .query(queryText, [gardenId])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing filtered garden plants: ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// GET selected plant
router.get("/selected/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const plantId = req.params.id;
    const queryText = `SELECT * FROM "plant" WHERE "plant_table_id" = $1;`;

    pool
      .query(queryText, [plantId])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with getting selected plant: ", err);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

// GET plant info - DETAILS page
router.get("/details/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const plantId = req.params.id;
    const queryText = `SELECT * FROM "plant" 
    JOIN "plant_info" ON "plant_info"."plant_info_table_id" = "plant"."plant_info_id"
    WHERE "plant"."user_id" = $1 AND "plant"."plant_table_id" = $2;`;

    pool
      .query(queryText, [user.id, plantId])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing plant info: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

// get plants with no garden
router.get("/no-garden", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "plant" 
    WHERE "plant"."garden_id" IS NULL;`;

    pool
      .query(queryText)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("error with GETTING plants with no garden: ", err);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

/* --------- UPDATE --------- */

// update plant route (PUT)
router.put("/update", (req, res) => {
  if (req.isAuthenticated()) {
    const { id, name, height, garden } = req.body;
    const queryText = `UPDATE "plant" SET "plant_name"=$1, "plant_height"=$2, "plant_created_at"=CURRENT_TIMESTAMP, "garden_id"=$4  WHERE "plant_table_id"=$3`;

    pool
      .query(queryText, [name, height, id, garden])
      .then((results) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log("Error with UPDATING plant: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

/* --------- DELETE --------- */

// delete plant route (DELETE)
router.delete("/delete/:plantId/:infoId", (req, res) => {
  if (req.isAuthenticated()) {
    const plantId = req.params.plantId;
    const infoId = req.params.infoId;
    const queryTextFirst = `DELETE FROM "plant_info" WHERE "plant_info"."plant_info_table_id" = $1;`;
    const queryTextSecond = `DELETE FROM "plant" WHERE "plant"."plant_table_id" = $1;`;

    pool
      .query(queryTextSecond, [plantId])
      .then((results) => {
        pool
          .query(queryTextFirst, [infoId])
          .then((results) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log("Error with DELETING plant: ", err);
            res.sendStatus(500);
          });
      })
      .catch((err) => {
        console.log("Error with DELETING plant info: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticatied");
    res.sendStatus(403);
  }
});

/* --------- POST --------- */

// create plant info
router.post("/info/create", (req, res) => {
  if (req.isAuthenticated()) {
    const plantInfo = req.body.plantInfo;
    const queryText = `INSERT INTO "plant_info" ("scientific_name", "sunlight_level", "water_level","sci_origin","sci_maintenance", "sci_cycle","sci_type","sci_soil","sci_growth_rate","scientific_color")
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    pool
      .query(queryText, [
        plantInfo.scientific_name,
        plantInfo.sunlight,
        plantInfo.water_level,
        plantInfo.origin,
        plantInfo.maintenance,
        plantInfo.cycle,
        plantInfo.type,
        plantInfo.soil,
        plantInfo.growth_rate,
        plantInfo.scientific_color,
      ])
      .then((result) => {
        res.send(result.rows)
      })
      .catch((err) => {
        console.log("Error with creating API DATA: ", err);
        res.sendStatus(500);
      });
  }else{
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});


// create plant (POST)
router.post("/create", (req,res)=>{
  if(req.isAuthenticated()){
    const userId = req.user
    const {name, height, date, plantId} = req.body;
    const queryText = `INSERT INTO "plant" ("plant_name","plant_height","plant_created_at","plant_info_id","user_id")
    VALUES($1,$2,$3,$4,$5);`;

    pool.query(queryText, [name, height, date, plantId, userId.id])
    .then((result)=>{
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.log("Error with creating plant: ", err)
      res.sendStatus(500)
    })


  }else{
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
})
module.exports = router;
