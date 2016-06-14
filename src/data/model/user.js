import mongo from '../db';

let user = new mongo.Schema('user', {
    photo: {
        type: String
    },
    displayName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    userName: {
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

    },
    wixin: {

    },
    alipay: {

    }
});

export default user;