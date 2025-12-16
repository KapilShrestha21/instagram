import mongoose from "mongoose";

const reelSchema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        trim: true,
        default: ""
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    likesCount: {
        type: Number,
        default: 0
    },

    commentsCount: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
)

export const Reel = mongoose.model("Reel", reelSchema);