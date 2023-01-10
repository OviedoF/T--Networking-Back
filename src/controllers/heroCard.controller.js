const path = require('path');
const { v4 } = require('uuid');
const HeroCard = require(path.join( __dirname, "..", "models", "heroCard.model" ));

const heroCardController = {};

heroCardController.createHeroCard = async (req, res) => {
    try {
        const { image, disclaimer, title, description, buttonText, buttonLink } = req.body;
        const { filename } = req.files[0];
        const newHeroCard = new HeroCard({
            image: filename,
            disclaimer,
            title,
            description,
            buttonText,
            buttonLink
        });
        await newHeroCard.save();
        res.status(200).json({
            message: 'Hero card created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

heroCardController.getHeroCard = async (req, res) => {
    try {
        const heroCard = await HeroCard.find();
        res.status(200).json({
            heroCard
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

heroCardController.deleteHeroCard = async (req, res) => {
    try {
        const { id } = req.params;
        await HeroCard.findByIdAndDelete
        res.status(200).json({
            message: 'Hero card deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error'
        });
    }
}

module.exports = heroCardController;