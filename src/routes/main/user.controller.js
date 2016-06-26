import express from 'express';
import isAuthenticated from '../../service/identity/authentication';
import isAuthorized from '../../service/identity/authorize';
var router = express.Router();

router.param( (param, validator) => {
  return function (req, res, next, val) {
    if (validator(val)) {
      console.log('CALLED ONLY ONCE ' + val)
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', (candidate) => {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});

router.get('/user/:id', (req, res) => {
  console.log('and this matches too   id : ' + req.params.id);
  res.end();
});

router.get('/signin', (req, res) => {

});

router.get('/register', (req, res) => {

})


export default router;
