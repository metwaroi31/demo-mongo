const express = require('express');
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = 'database';
const PORT = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
const COLLECTION_NAME = 'fs.files';
// Create a storage object with a given configuration
const storage = new GridFsStorage({ url: URL + DATABASE_NAME } );

// Set multer storage engine to the newly created object
const upload = multer({ storage });

const app = express();
const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Upload your files as usual
app.post('/profile', upload.single('avatar'), (req, res, next) => { 
        // TODO: Store fileId as support query as 
    res.send("image uploaded successfully.");

    /*....*/ 
});

app.get('/profiles', async (req, res, next) => { 
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const documents = await collection.find({}).toArray();
    console.log(documents);
    res.send(documents);
});

app.listen(PORT, () =>  console.log(`Listening on port ${PORT}`));
