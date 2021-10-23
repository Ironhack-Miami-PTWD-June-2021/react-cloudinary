const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// this is the original cloudinary method. Try to use this method first and if your having issues, then try cloudinary.v2 method of upload
// const cloudinary = require("cloudinary");
// const cloudinaryStorage = require("multer-storage-cloudinary");
// const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

// version 2 (v2)
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "spots", // The name of the folder in cloudinary
        resource_type: "raw", // => this is in case you want to upload other type of files, not just images
    },
});

// const storage = cloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "spots",
//         allowedFormats: ["jpg", "png"],
//     },
// });

module.exports = multer({ storage });
