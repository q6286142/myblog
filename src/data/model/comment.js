module.exports = (mongoose) => {
    let Schema = mongoose.Schema;
    mongoose.model('Comment',{
        a_id:{
            type:Schema.Types.ObjectId,
            ref:'Article'
        },
        u_id:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        content:String,
        replys: [{          //回答 的 讨论
            content: String,
            u_id:Object,
            created: Date
        }],
        status: {           // 1 : 显示 ，0 : 删除
            type: Number,
            default:1
        },		
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    });
};