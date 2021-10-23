const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const uploadCloud = require("../../config/cloudinary.setup");

/* GET home page */
router.patch(
    "/image/:productId",
    uploadCloud.single("image"),
    (req, res, next) => {
        // if using cloudinary v2 method, use req.file.path. For original method req.file.url
        Product.findByIdAndUpdate(
            req.params.productId,
            { image: req.file.path },
            { new: true }
        )
            .then((updatedProduct) => {
                res.json({ success: true, product: updatedProduct });
            })
            .catch((err) =>
                res.json({
                    success: false,
                    message: "Error while trying to update product image",
                    err,
                })
            );
    }
);

router.patch(
    "/imageArray/:productId",
    uploadCloud.array("imageArray"),
    (req, res, next) => {
        // if using cloudinary v2 method, use req.file.path. For original method req.file.url
        Product.findById(req.params.productId)
            .then((productFromDB) => {
                req.files.forEach((file) => {
                    productFromDB.imageArray.push(file.path);
                    // cloudinary original method use file.url
                    // cloudinary v2 method use file.path
                });
                productFromDB
                    .save()
                    .then((updatedProduct) => {
                        res.json({ success: true, product: updatedProduct });
                    })
                    .catch((err) =>
                        res.json({
                            success: false,
                            message: "Error while trying to update image Array",
                            err,
                        })
                    );
            })
            .catch((err) =>
                res.json({
                    success: false,
                    message:
                        "Error while trying to get product to update image Array",
                    err,
                })
            );
    }
);

module.exports = router;
