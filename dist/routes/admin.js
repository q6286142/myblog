'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.all('*', function (req, res) {
    console.log("requset admin info");
    res.render("admin/index");
});

//module.exports = router;

exports.default = router;
//# sourceMappingURL=admin.js.map