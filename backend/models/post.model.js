import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    text:{
        type:String,
    },
    img:{
        type:String,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments:[
        {
            text:{
                type:String,
                required: true
            }
        }
    ]
},{ timestamps: true})

const Post= mongoose.model("Post", postSchema)
export default Post;