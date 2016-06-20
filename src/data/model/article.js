export default function (Schema) {
    mongoose.model('Article', {
        title: {
            type: String,
            unique: true
        },
        content: String,
        serie:{
            type: Schema.Types.ObjectId,
            ref: 'Serie'
        },        
        tags: [{                //一篇文章可以有多个标签
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }],
        visit_count: {			//访问数
            type: Number,
            default: 1
        },
        comment_count: {		//评论数
            type: Number,
            default: 0
        },
        status: {				//0:草稿 1:发布
            type: Number,
            default: 0
        },
        created: {
            type: Date,
            default: Date.now
        },
        publish_time: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    });
};