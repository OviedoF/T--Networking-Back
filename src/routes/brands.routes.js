const express = require("express");
const path = require("path");
const router = express.Router();

const brandsControllers = require(path.join( __dirname, "..", "controllers", "brand.controller" ));

router.get('/', brandsControllers.getBrands);
router.post('/', brandsControllers.createBrand);
router.delete('/:id', brandsControllers.deleteBrand);

module.exports = router;