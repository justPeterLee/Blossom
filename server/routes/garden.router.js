const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const user = req.user;
  const queryText = `SELECT "garden"."garden_table_id", "garden"."garden_name", "garden"."garden_created_at", "garden"."garden_type", "garden"."garden_theme", COUNT("plant"."plant_table_id") FROM "garden" 
  LEFT JOIN "plant" ON "garden"."garden_table_id" = "plant"."garden_id"
  WHERE "garden"."user_id" = $1
  GROUP BY "garden"."garden_table_id";
  `;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error with getting user's garden data, ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

// GET Garden Filter
router.get("/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated) {
    const user = req.user;
    const gardenId = req.params.id;
    const queryText = `SELECT "plant"."plant_table_id", "plant"."plant_name", "plant_info"."scientific_name" FROM "plant_info" 
    JOIN "plant" ON "plant"."plant_info_id" = "plant_info"."plant_info_table_id" 
    WHERE "plant"."user_id" = $1 AND "plant"."garden_id" = $2;`;

    pool
      .query(queryText, [user.id, gardenId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error with getting garden filter data: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

router.post("/create", (req, res) => {
  if (req.isAuthenticated) {
    const { name, type, theme, selected } = req.body;
    const userId = req.user;
    const queryText = `INSERT INTO "garden" ("garden_name","garden_type","garden_theme","user_id")
    VALUES ($1, $2, $3, $4);`;
    const queryTextUpdate = `UPDATE "plant" SET "garden_id" = $1 WHERE "plant"."plant_table_id" = $2 AND "plant"."user_id" = $3`;

    if (selected.length > 0) {
      const queryTextGet = `SELECT "garden"."garden_table_id" FROM "garden"`;

      let oldGardenID = [];
      let newGardenID = [];
      let createGardenID = [];

      pool
        .query(queryTextGet)
        .then((result) => {
          result.rows.map((id) => {
            oldGardenID.push(id.garden_table_id);
          });

          pool
            .query(queryText, [name, type, theme, userId.id])
            .then((result) => {
              pool
                .query(queryTextGet)
                .then((result) => {
                  result.rows.map((id) => {
                    newGardenID.push(id.garden_table_id);
                  });
                  createGardenID = newGardenID.filter(
                    (val) => !oldGardenID.includes(val)
                  );

                  selected.map((plantId) => {
                    pool
                      .query(queryTextUpdate, [
                        createGardenID[0],
                        plantId,
                        userId.id,
                      ])
                      .then((results) => {
                        
                      })
                      .catch((err) => {
                        console.log("Error with updating select plants: ", err);
                        res.sendStatus(500);
                      });
                  });

                  res.sendStatus(200)
                })
                .catch((err) => {
                  console.log("Error with getting new garden id: ", err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.log("Error with POST garden: ", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("Error with getting old garden id: ", err);
          res.sendStatus(500);
        });
    } else {
      pool
        .query(queryText, [name, type, theme, userId.id])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error with POST garden: ", err);
          res.sendStatus(500);
        });
    }
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

module.exports = router;
