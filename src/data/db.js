import mongoose from 'mongoose';
const uri = 'mongodb://qjy:6286142jia!@localhost:27017/blog';

let mongo = mongoose.createConnection(uri)

mongo.on('error', function(err){
    if(err){
        throw err;   
    }
});

module.exports = mongo;