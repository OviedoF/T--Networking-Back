const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/vcard/:name', async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name)
        res.download(path.join(__dirname, "..", "public", "vcf", name));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
})

router.get('/qr/:name', async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name)
        res.download(path.join(__dirname, "..", "public", "qr", name));
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
})

module.exports = router;