export default function (Schema){
    mongoose.model('User',{
        photo: {
            type: String
        },
        nickname: {
            type: String,
            unique: true
        },
        role: {
            type: String,
            default: 'user'
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        provider: {
            type: String,
            default: 'local'
        }//,
        // github: {

        // },
        // qq: {

        // },
        // weibo: {

        // }
    });
};