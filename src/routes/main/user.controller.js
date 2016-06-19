import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      console.log('CALLED ONLY ONCE '+ val)
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});

// router.param('id', function (req, res, next, id) {
//   console.log('CALLED ONLY ONCE '+ id);
//   next();
// });

router.get('/user/:id', function (req, res, next) {
  res.send('although this matches   id : ' + req.params.id);
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too   id : ' + req.params.id);
  res.end();
});


export default router;
