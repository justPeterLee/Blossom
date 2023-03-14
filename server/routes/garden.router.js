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
  GROUP BY "garden"."garden_table_id"
  ORDER BY "garden"."garden_table_id" ASC;
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
    const queryText = `SELECT "plant"."plant_table_id", "plant"."plant_name", "plant"."plant_image", "plant_info"."scientific_name" FROM "plant_info" 
    JOIN "plant" ON "plant"."plant_info_id" = "plant_info"."plant_info_table_id" 
    WHERE "plant"."user_id" = $1 AND "plant"."garden_id" = $2
    ORDER BY "plant"."plant_table_id" ASC;`;

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
    VALUES ($1, $2, $3, $4) RETURNING *;`;
    const queryTextUpdate = `UPDATE "plant" SET "garden_id" = $1 WHERE "plant"."plant_table_id" = $2 AND "plant"."user_id" = $3`;

    if (selected.length > 0) {
      pool
        .query(queryText, [name, type, theme, userId.id])
        .then((result) => {
          const gardenId = result.rows;
          selected.map((plantId) => {
            pool
              .query(queryTextUpdate, [
                gardenId[0].garden_table_id,
                plantId,
                userId.id,
              ])
              .then((results) => {})
              .catch((err) => {
                console.log("Error with updating select plants: ", err);
                res.sendStatus(500);
              });
          });

          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error with POST garden: ", err);
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

router.get("/gardenId/:id", (req, res)=>{
  if(req.isAuthenticated){
    const user = req.user;
    const gardenId = req.params.id 
    const queryText = `SELECT "garden"."garden_name" FROM "garden" WHERE "garden"."garden_table_id" = $1 AND "garden"."user_id" = $2;`

    pool.query(queryText, [gardenId, user.id])
    .then((result)=>{
      res.send(result.rows)
    })
    .catch((err)=>{
      console.log("Error with getting garden by id: ", err)
      res.sendStatus(500)
    })
  }else{
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
})
// DELETE
router.delete("/delete/:id", (req, res) => {
  if (req.isAuthenticated) {
    const user = req.user;
    const gardenId = req.params;
    const queryTextUpdate = `UPDATE "plant" SET "garden_id" = null WHERE "garden_id" = $1 AND "user_id" = $2;`;
    const queryTextDelete = `DELETE FROM "garden" WHERE "garden_table_id" = $1 AND "user_id" = $2`
    pool
      .query(queryTextUpdate, [gardenId.id, user.id])
      .then((result) => {
        pool.query(queryTextDelete, [gardenId.id, user.id])
        .then((results)=>{
          res.sendStatus(200);
        })
        .catch((err)=>{console.log("Error with Deleting garden: ", err); res.sendStatus(500)})
      })
      .catch((err) => {
        console.log("Error with updating plants for garden delete: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});
module.exports = router;

// createGardenID = newGardenID.filter(
//   (val) => !oldGardenID.includes(val)
// );
