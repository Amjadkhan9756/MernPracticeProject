import mongoose from "mongoose";


const connectionsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    connections:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"  
    },
    status_accepted:{
        type:Boolean,
        default:null
    }

});

const connections = mongoose.model("connection", connectionsSchema);
export default connections;