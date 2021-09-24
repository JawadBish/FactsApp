import mongoose from "mongoose";


const factSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    category: String,
    creator: String,
    tags: [String],
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Facts = mongoose.model('Facts', factSchema);

export default Facts;