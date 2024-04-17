const express = require('express');
const router = express.Router();
const upload = require('./upload_file');
const Video = require('./model');

// POST 
router.post('/image', upload.array('files', 100), async (req, res) => {
   try {
        // Create a new Video object with the uploaded video details
        const returnImages = [];
        // multiple file
        req.files.forEach(async (file) => {
            const video = new Video();
            video.url = file.location;
            video.fileName = file.originalname;
            video.title = file.originalname;
            video.storageName = file.key;
            const savedVideo = await video.save();
            returnImages.push(savedVideo)
        });        
        // Save the video to the database
        console.log(returnImages)
        res.json({
            message: 'Images uploaded successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while uploading the video'
        });
    }
});

router.get('/images', async (req, res) => {
    res.json(await Video.find({}))
})

module.exports = router
