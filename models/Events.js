import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["pdf", "youtube", "image", "url", "canva"],
        required: true
    },
    order:{
        type: Number,
        default: 0
    }
}, { timestamps: true }); 

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;