const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
   // Send back user object from database
   res.send(req.user);
});

// router.get('/api/user', (req, res) => {
//    console.log('id', req.user.id);

//    const userId = req.user.id
//    pool.query('SELECT * FROM "location" WHERE "user_id" = ($1);', [userId])
//    .then((results) => {
//       res.send(results.data)
//       console.log(req.user);

//    })
// })

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
   console.log('req: ', req.body);

   const username = req.body.username;
   const password = encryptLib.encryptPassword(req.body.password);
   const city = req.body.city;
   const state = req.body.State;
   //   const latitude = '';
   //   const longitude = '';
   //   const uvIndex = '';
   //   const date = req.body.date;
   
   const queryText =`WITH insert1 AS (
      INSERT INTO "user" (username, password, default_city, default_state)
       VALUES ($1, $2, $3, $4) RETURNING id as user_id
   )
      INSERT INTO "locations"(city, state, user_id)
      VALUES ($5, $6, (SELECT * FROM insert1));`
   // INSERT INTO "uv_data" (date, reported_uv_index, location_id)
   //  VALUES ($6, $7, $8)
   
   // const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id as user_id';
   // const queryText2 = 'INSERT INTO "locations" (city, state, user_id) VALUES ($1, $2, $3) RETURNING id as location_id';
   // const queryText3 = 'INSERT INTO "uv_data" (date, reported_uv_index, location_id) VALUES ($1, $2, $3)'
   pool.query(queryText, [username, password, city, state, city, state])
      // .then(pool.query(queryText2, [city, state, user_id])
         //   pool.query(queryText3, [date, uvIndex])
         .then(() => { res.sendStatus(201); })
         .catch((err) => { next(err); })
      // )

});


router.post('/', (req, res) => {
   const queryText = 'INSERT INTO "locations"'
   pool.query()
})




// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
   res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
   // Use passport's built-in method to log out the user
   req.logout();
   res.sendStatus(200);
});

module.exports = router;
