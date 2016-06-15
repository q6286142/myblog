import mongo from '../db';

let user = new mongo.Schema('user', {
    photo: {
        type: String
    },
    nickname: {
        type: String,
        unique:true
    },
    role: {
        type: String,
        default: 'user'
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    github: {

    },
    qq: {

    },
    weibo: {

    }
});



export default user;