const express = require('express');
const router  = express.Router();
const Product = require('../../models/Product');
const productsArray = require('../../bin/seeds');

/* GET home page */
router.get('/seed-my-db', async (req, res, next) => {
    try {
        await productsArray.forEach(product => {
            Product.create(product);
        });

        res.json({ success: true, message: 'DB has been seeded'});
    } catch (err) {
        res.json({success: false, message: 'Error while trying to seed database', err})
    }
});

module.exports = router;
