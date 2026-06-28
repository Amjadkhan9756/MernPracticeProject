import mongoose from "mongoose";


const comentSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref :"User  "

  },
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"

  },
  body:{
    type:String,
    require:true

  }
});


const comment = mongoose.model("comment", comentSchema)
export default comment;
