import mongo from '../db';

let user = new mongo.Schema('user',{
    photo:'string',
    displayName:'string',
    role:{
        type:String,
        default:'user'
    },
    userName:{
        type:String,
        required:true
    },
    email:'string',
    password:'string',
    github:{
        
    },
    qq:{
        
    },
    weibo:{
        
    },
    wixin:{
        
    },
    alipay:{
        
    }
});

export default user;