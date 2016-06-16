import express from 'express';
var router = express.Router();



/* GET admin index page. */
router.get(/\/(index)?/, function(req, res, next) {
  res.render('index', { title: '我的 Express' });
});

//module.exports = router;

export default router;
