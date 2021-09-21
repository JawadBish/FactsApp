import mongoose from "mongoose";


const factSchema = mongoose.Schema({
    title: String,
    message: String,
    category: String,
    creator: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const FactDB = mongoose.model('FactDB', factSchema);

export default FactDB;