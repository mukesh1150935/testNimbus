import mongoose from "mongoose";
const Schema = mongoose.Schema;

const confessionSchema= new mongoose.Schema({
    content:{
        type: String
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    secretName:{
        type: String,
        default:"Anonymous"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

export const confessionModel = mongoose.model("confession",confessionSchema);