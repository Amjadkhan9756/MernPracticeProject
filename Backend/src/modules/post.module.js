import mongoose from "mongoose ";

const postSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true

   },
   body:{
    type:String,
    require:true

   },
   likes:{
    type:number,
    default:0

   },
   media:{
    type:String,
    default:" "

   },
   active:{
    type:Boolean,
    default:true

   },
   fileType:{
    type:String,
    default:" "

   }
},{timestamps: true})

const Post = mongoose.model("Post", postSchema);
export default Post