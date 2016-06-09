import mongoose from 'mongoose';
const uri = 'mongodb://qjy:6286142jia!@localhost:27017/blog';

mongoose.createConnection(uri)

let mongo = mongoose.connection;

mongo.on('error', function(err){
    if(err){
        throw err;   
    }
});

export default mongo;