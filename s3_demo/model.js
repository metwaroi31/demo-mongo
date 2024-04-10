const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    storageName: {
        type: String,
        required: true  
    },
    fileName: {
        type: String,
        required: true
    },
    // change type to string if your uploading just one image
    url: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Video = mongoose.model("Video", VideoSchema);
module.exports = Video;
