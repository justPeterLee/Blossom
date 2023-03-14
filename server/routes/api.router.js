const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require("axios");
/**
 * GET route template
 */
router.post(
  "/upload", // path name
  fileUpload({ createParentPath: true }), // allow express route to recieve files
   (req, res) => {

      // base64 image
      let base;

      let fileName = `${__dirname}`

      // file recieved
      const files = req.files;
      const fileKey = Object.keys(files)[0];
      const filePath = path.join(__dirname, "files", files[fileKey].name);

      const newFile = new Promise(function (myResolve, myReject) {
        files[fileKey].mv(filePath, (err) => {
          if (err) {
            myReject();
          } else {
            myResolve();
          }
        });
      });

      newFile.then(
        function (value) {
          base = fs.readFileSync(filePath, "base64");
          //console.log(base);
          const data = {
            api_key: process.env.PLANT_ID_KEY,
            images: [base],
          };

          // axios request to API endpoints
          axios
            .post(`https://api.plant.id/v2/identify`, data) // request to Plant.ID
            .then((response) => {
              axios // request to Perenual (gneral detail)
                .get(
                  `https://perenual.com/api/species-list?page=1&key=${process.env.PERENUAL_KEY}&q=${response.data.suggestions[0].plant_name}`
                )
                .then((responsNext) => {
                  axios //request to Perenual (detailed info)
                    .get(
                      `https://perenual.com/api/species/details/${responsNext.data.data[0].id}?key=${process.env.PERENUAL_KEY}`
                    )
                    .then((newResponse) => {
                      // data instance
                      const resPlantData = newResponse.data;

                      // array data
                      let origin;
                      let soil;
                      let color;
                      


                      const checkArray = (arr) => {
                        if(Array.isArray(arr)){
                          if(arr.length === 0){
                            return null;
                          }
                          else if(arr.length === 1){
                            return arr[0];
                          }
                          else if(arr.length > 1){
                            return arr.join(', ');
                          }
                          else{
                            return arr;
                          }
                        }else{
                          return arr;
                        }
                        
                      }
                      // data needed
                      const plantInfo = {
                        scientific_name: resPlantData.scientific_name[0],
                        sunlight: resPlantData.sunlight[0],
                        water_level: resPlantData.watering,
                        origin: checkArray(resPlantData.origin),
                        maintenance: resPlantData.maintenance,
                        cycle: resPlantData.cycle,
                        type: resPlantData.indoor,
                        soil: checkArray(resPlantData.soil),
                        growth_rate: resPlantData.growth_rate,
                        scientific_color: checkArray(resPlantData.leaf_color),
                        image: `/images/${files[fileKey].name}`
                      };
                      console.log('created')
                      res.send(plantInfo);
                      
                    })
                    .catch((err) => {
                      console.log("Error with getting deatailed plant, ", err);
                      res.sendStatus(500);
                    });
                })
                .catch((err) => {
                  console.log("Error with getting  general plant info, ", err);
                  res.sendStatus(500);
                });
            })
            .catch((err) => {
              console.log("Error with getting identifying plant, ", err);
              res.sendStatus(500);
            });
        },
        function (error) {
          console.log("Error with create new image file: ", error);
          res.sendStatus(500);
        }
      );

      //base = fs.readFileSync(filePath, "base64");

      // Plant.id endpoints

      //res.sendStatus(200)
  }
);



// Explore Plant
router.get('/explore/plant/:id', rejectUnauthenticated, (req,res)=>{
  if(req.isAuthenticated){
    const pageId = req.params.id;
    axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}&page=${pageId}`)
    .then((response)=>{
      const data = response.data;
      let sendData = [];
      for(let i=0; i<8; i++){
        sendData.push(data.data[i])
      }
      res.send(sendData)
    })
  }else{
    res.sendStatus(401)
  }
})


// Explore Garden 
router.get('/explore/garden/:id', rejectUnauthenticated, (req,res)=>{
  if(req.isAuthenticated){
    const data = req.params.id
    axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}&indoor=1&page=${data}`)
    .then((response)=>{
      const data = response.data;
      let sendData = [];
      for(let i=0; i<8; i++){
        sendData.push(data.data[i])
      }
      res.send(sendData)
      
    })

    console.log(data);
  }else{
    res.sendStatus(401)
  }
})
/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;



