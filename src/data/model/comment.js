export default function (Schema){
    mongoose.model('Comment',{
        a_id:{
            type:Schema.type.ObjectId,
            ref:'Article'
        },
        u_id:{
            type:Schema.type.ObjectId,
            ref:'User'
        },
        content:String,
        replys: [{
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