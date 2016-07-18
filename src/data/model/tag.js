module.exports = (mongoose) => {
    let Schema = mongoose.Schema;
    mongoose.model('Tag',{
        title: {
            type: String,
            required:true,
            unique: true
        },
        icon: {
            type: String,
            required:true
        },
        brief: {
            type: String,
            required:true
        },
        website: {
            type: String,
            required: true
        }
    });
};