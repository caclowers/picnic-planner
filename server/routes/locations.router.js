const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
   console.log('id', req.user.id);

   const user_id = req.user.id
   const queryText = `SELECT * FROM "locations" 
                        JOIN "user" ON "locations"."user_id" = "user"."id" WHERE "user"."id" = $1 
                        ORDER BY "locations"."id" DESC;`;
   pool.query(queryText, [user_id]).then((results) => {
      console.log('GET results row 14', results.rows);
      res.send(results.rows)
   })

});


router.get('/specific', (req, res) => {
   console.log('id', req.user.id);
console.log('req.bodyyyy', req.body);

   const user_id = req.user.id
 
   const queryText = `SELECT * FROM "locations" 
                        JOIN "user" ON "locations"."user_id" = "user"."id" WHERE "user"."id" = $1 
                        ORDER BY "locations"."id" desc;`;
   pool.query(queryText, [user_id]).then((results) => {
      console.log('GET results row 27', results.rows[0]);
      res.send(results.rows[0])
   })

});

// =========================================================================


/**p[]
 * POST route template
 */
router.post('/', (req, res) => {
   console.log('req.body is:', req.body)
   // const username = req.body.username;
   // const password = encryptLib.encryptPassword(req.body.password);
   const user_id = req.body.userID;
   const city = req.body.newCity;
   const state = req.body.newState;
   const latitude = req.body.lat;
   const longitude = req.body.long;
   // const uvIndex = req.body.uvIndex;
   // const date = req.body.date;


   const queryText = `INSERT INTO "locations" (city, state, latitude, longitude, user_id) 
                        VALUES ($1, $2, $3, $4, $5) RETURNING id;`
   // const queryText3 = 'INSERT INTO "uv_data" (date, reported_uv_index, location_id) VALUES ($1, $2, $3)';
   pool.query(queryText, [city, state, latitude, longitude, user_id])
      // .then(
      //    pool.query(queryText3, [date, uvIndex, location_id]))
      .then(() => { res.sendStatus(201); }
      ).catch((err) => { 
         console.log('error in router.post:', err);
            
      });
});


// =========================================================================


router.put('/:id', (req, res) => {
   console.log('line 64', req.body);
   console.log(req.params);

   const id = req.user.id;
   if (req.isAuthenticated()) {
      let queryText = `UPDATE "locations" SET city = $1, state = $2, latitude = $3, longitude = $4 WHERE id = $5;`;
      pool.query(queryText, [req.body.newCity, req.body.newState, req.body.lat, req.body.long, id]).then((result) => {
         res.send(result.rows);
      }).catch((error) => {
         console.log(error);
         res.sendStatus(500);
      });
   } else {
      res.sendStatus(403);
   }
});


// =======================================================================================


router.delete('/:id', (req, res) => {
   console.log('delete ROUTER req.body:', req.body);
   
//    const user_id = req.body
//    const queryText = 'DELETE FROM "locations" WHERE "user_id" = $1 AND "id" = $2;';
//    pool.query(queryText, [user_id, req.body.id])
//       .then(() => {
//          res.sendSatus(200)
//       }).catch((error) => {
//          console.log('error in router.delete', error);
//       });
});



module.exports = router;