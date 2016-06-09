'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  console.log('Time: %d', Date.now());
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   router.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', err);
});

module.exports = router;
//# sourceMappingURL=error.js.map