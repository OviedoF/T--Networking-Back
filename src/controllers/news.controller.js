const News = require('../models/news.model');
const User = require('../models/user.model');
require('dotenv').config();

const newsController = {};

newsController.getNews = async (req, res) => {
    try {
        const news = await News.find().populate('author');
        res.status(200).send(news);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

newsController.createNews = async (req, res) => {
    try {
        const {title, description, authorId} = req.body;

        const user = await User.findById(authorId);
        if(!user) return res.status(404).json({
            message: 'User not found'
        });

        const {filename} = req.files[0];
        const imageUrl = `${process.env.ROOT_URL}/images/${filename}`;

        const news = new News({
            title,
            description,
            image: imageUrl,
            author: authorId
        });

        await news.save();

        res.status(201).json({
            message: 'Noticia creada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

newsController.getNewsById = async (req, res) => {
    try {
        const {id} = req.params;
        const news = await News.findById(id).populate('user');
        if(!news) return res.status(404).json({
            message: 'Noticia no encontrada'
        });

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

newsController.updateNews = async (req, res) => {
    try {
        const {id} = req.params;
        const news = await News.findByIdAndUpdate(id, req.body)

        if(!news) return res.status(404).json({
            message: 'Noticia no encontrada'
        });

        res.status(200).json({
            message: 'Noticia actualizada correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

newsController.deleteNews = async (req, res) => {
    try {
        const {id} = req.params;
        const news = await News.findByIdAndDelete(id);

        if(!news) return res.status(404).json({
            message: 'Noticia no encontrada'
        });

        res.status(200).json({
            message: 'Noticia eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = newsController;