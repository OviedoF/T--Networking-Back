const path = require('path');
const Comment = require(path.join(__dirname, '..', 'models', 'comments.model'));
const User = require(path.join(__dirname, '..', 'models', 'user.model'));

const commentsController = {};

commentsController.getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('author');
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

commentsController.createComment = async (req, res) => {
    try {
        const {author, description} = req.body;

        const user = await User.findById(author);

        if(!user) return res.status(404).json({
            message: 'Usuario no encontrado'
        });

        const comment = new Comment({
            author,
            comment: description,
            aproved: false
        });

        await comment.save();

        res.status(201).json({
            message: 'Comentario creado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

commentsController.approveComment = async (req, res) => {
    try {
        const {id} = req.params;

        const comment = await Comment.findByIdAndUpdate(id, {
            status: 'approved'
        });

        if(!comment) return res.status(404).json({
            message: 'Comentario no encontrado'
        });

        await comment.save();

        res.status(200).json({
            message: 'Comentario aprobado correctamente.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

commentsController.rejectComment = async (req, res) => {
    try {
        const {id} = req.params;

        const comment = await Comment.findByIdAndUpdate(id, {
            status: 'rejected'
        });

        if(!comment) return res.status(404).json({
            message: 'Comentario no encontrado'
        });

        await comment.save();

        res.status(200).json({
            message: 'Comentario no aprobado.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = commentsController;