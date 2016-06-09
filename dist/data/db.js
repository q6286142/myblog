'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uri = 'mongodb://qjy:6286142jia!@localhost:27017/blog';

_mongoose2.default.connect(uri, function (error) {
    if (error) {
        console.log(error);
    }
});

module.exports = _mongoose2.default;
//# sourceMappingURL=db.js.map