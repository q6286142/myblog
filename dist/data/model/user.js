'use strict';

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRole = {};

var user = new _db2.default.Schema({
    displayName: 'string',
    role: 'string',
    userName: 'string',
    email: 'string',
    password: 'string'
});

// function init(mongoose){
//     var  mongoose.
// }
//# sourceMappingURL=user.js.map