const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const uploadCloud = require("../../config/cloudinary.setup");

// Add Product (Create)
router.post("/add-product", uploadCloud.single("image"), (req, res, next) => {
    const productInputInfo = req.body;
    productInputInfo.image = req.file.path;

    // productInputInfo.image = req.file.path;
    // use file.url when using regular cloudinary method to get image url
    // use file.path when using v2 cloudinary method to get image url

    Product.create(productInputInfo)
        .then((newlyCreatedProduct) => {
            res.json({ success: true, product: newlyCreatedProduct });
        })
        .catch((err) =>
            res.json({
                success: false,
                message: "There was an error while adding product",
                err,
            })
        );
});

// Product List (Read)
router.get("/list", (req, res, next) => {
    Product.find()
        .then((productsFromDB) => {
            res.json({ success: true, product: productsFromDB });
        })
        .catch((err) =>
            res.json({
                success: false,
                message: "There was an error while getting product list",
                err,
            })
        );
});

// Product Details (Read)
router.get("/details/:productId", (req, res, next) => {
    Product.findById(req.params.productId)
        .then((productFromDB) => {
            res.json({ success: true, product: productFromDB });
        })
        .catch((err) =>
            res.json({
                success: false,
                message: "There was an error while getting product details",
                err,
            })
        );
});

// Update Product (Update)
router.put("/update/:productId", (req, res, next) => {
    Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
        .then((updatedProduct) => {
            res.json({ success: true, product: updatedProduct });
        })
        .catch((err) =>
            res.json({
                success: false,
                message: "There was an error while updating product",
                err,
            })
        );
});

// Delete Product (Delete)
router.delete("/delete/:productId", (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                success: true,
                message: "Product was successfully removed from database",
            });
        })
        .catch((err) =>
            req.json({
                success: false,
                message: "Error while deleting product",
            })
        );
});

module.exports = router;
