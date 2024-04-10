const { MongoClient } = require('mongodb');
const GridFSBucket = require('mongodb').GridFSBucket;
const fs = require('fs');

// Create a new MongoClient
const client = new MongoClient('your_mongodb_uri');

async function uploadFile(filePath, dbName, bucketName) {
    try {
// Connect to the MongoDB client
        await client.connect();

        const db = client.db(dbName);

        // Create a new GridFS bucket
        const bucket = new GridFSBucket(db, {
            bucketName: bucketName
        });

        // Create a read stream from the file to be uploaded
        const readStream = fs.createReadStream(filePath);

        // Create a write stream to GridFS
        const writeStream = bucket.openUploadStream(filePath);

        // Pipe the file data into the write stream
        readStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('File uploaded successfully');
        });
    } catch (err) {
        console.error('Failed to upload file', err);
    } finally {
        // Ensure the client will close when you finish/error
        await client.close();
    }
}

// Usage
uploadFile('path_to_your_file', 'your_database_name', 'your_bucket_name');
