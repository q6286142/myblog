import express from 'express';
var router = express.Router();

router.get(/(\/index)?/, function(req, res, next) {
  res.render('admin/index',);
});

module.exports = (app) => {
  app.use(router);
}
/* GET admin index page. */


//module.exports = router;
