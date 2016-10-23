angular.module('giphyApp');

app.controller('MainController', MainController);

var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

// GET /favorites
router.get('/', function (req, res) {

  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    // if (req.query.q) {
    //   // It's the eye of the tiger, it's the thrill of the fight
    //     var search = req.query.q;
    //     pool.connect(function (err, client, done) {
    //       if (err) {
    //         console.log('Error connecting to the DB', err);
    //         res.sendStatus(500);
    //         done();
    //         return;
    //       }
    //       client.query('SELECT * FROM treats WHERE name=$1;', [search], function (err, result) {
    //         done();
    //         if (err) {
    //           console.log('Error querying the DB', err);
    //           res.sendStatus(500);
    //           return;
    //         }
    //         console.log('Got rows from the DB:', result.rows);
    //         res.send(result.rows);
    //       });
    //     });
    // } else {
      client.query('SELECT * FROM favorites;', function (err, result) {
        done();
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }

        console.log('Got rows from the DB:', result.rows);
        res.send(result.rows);
      });
    //}
  });
});

/** ---- PUT YOUR CODE BELOW ---- **/

// POST /treats
router.post('/', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3) RETURNING *;', [req.body.name, req.body.description, req.body.pic], function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});


// PUT /treats/<id>
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var description = req.body.description;
  var pic = req.body.pic;
  pool.connect(function(err, client, done) {
    try {
      if(err) {
        console.log('Error querying to the DB', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE treats SET name=$1, description=$2, pic=$3 WHERE id=$4;', [name, description, pic, id], function(err, result) {
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    } finally {
      done();
    }
  });
});
// DELETE /treats/<id>
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
        return;
      }
      client.query('DELETE FROM treats WHERE id=$1;', [id], function(err) {
        if(err) {
          console.log('Error query the DB', err);
          res.sendStatus(500);
          return;
        }
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});



/** ---- DO NOT MODIFY BELOW ---- **/
module.exports = router;
