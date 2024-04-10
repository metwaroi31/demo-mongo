const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId,
    region: 'ap-southeast-2', // Update the region to 'eu-north-1'
    correctClockSkew: true
  });

const s3 = new aws.S3();
console.log(s3)
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dog-cat-bucket-mongo',
        metadata: (req, file, cb) => {
            console.log(file)
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;
