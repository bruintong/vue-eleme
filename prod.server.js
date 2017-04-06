var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var menu = require('./src/service/menu.json');
var ratings = require('./src/service/ratings.json');
var restaurant = require('./src/service/restaurant.json');
var scores = require('./src/service/scores.json');
var tags = require('./src/service/tags.json');

var apiRoutes = express.Router();

apiRoutes.get('/menu', function (req, res) {
  res.json({
    errno: 0,
    data: menu
  })
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

apiRoutes.get('/restaurant', function (req, res) {
  res.json({
    errno: 0,
    data: restaurant
  })
})

apiRoutes.get('/scores', function (req, res) {
  res.json({
    errno: 0,
    data: scores
  })
})

apiRoutes.get('/tags', function (req, res) {
  res.json({
    errno: 0,
    data: tags
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'));

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost: ' + port + '\n');
});
