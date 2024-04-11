const express = require('express');
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/database';
const PORT = process.env.PORT || 5000;

// Create a storage object with a given configuration
const storage = new GridFsStorage({ url });

// Set multer storage engine to the newly created object
const upload = multer({ storage });

const app = express();

// Upload your files as usual
app.post('/profile', upload.single('avatar'), (req, res, next) => { 
    res.send("image uploaded successfully.");

    /*....*/ 
});
app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));

// app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
//     /*....*/ 
// });

// app.post('/cool-profile', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), (req, res, next) => {
//     /*....*/ 
// });
