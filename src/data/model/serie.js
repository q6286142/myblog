module.exports = (mongoose) => {
    let Schema = mongoose.Schema;
    mongoose.model('Serie',{
        title: {
            type: String,
            required:true,
            unique: true
        },
        icon: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        created:{
            type:Date,
            default:Date.now
        }
    });
};