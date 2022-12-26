const path = require("path")
const User = require(path.join(__dirname, '..', 'models', 'user.model'));

const usersControllers = {};

usersControllers.getAllUsers = async (req, res) => {
    try {
        const usersFinded = await User.find().populate('roles');

        res.status(200).send(usersFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error al obtener usuarios.'
        })
    }
}

usersControllers.getUsers = async (req, res) => {
    try {
        const usersFinded = await User.find();

        res.status(200).send(usersFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

usersControllers.updateUsers = async (req, res) => {
    try {

        const {id} = req.params;
        const userFinded = await User.findById(id)

        if(!userFinded) return res.status(404).send("Usuario no encontrado.")

        const userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true})

        res.status(200).send(userUpdated)
    } catch (error) {
        return res.status(500).send({message: 'Usuario admin no modificado.'});
    }
}

usersControllers.updateUserImage = async (req, res) => {
    try {
        const {id} = req.params;
        const userFinded = await User.findById(id)
        const {filename} = req.files[0];

        if(!userFinded) return res.status(404).send("Usuario no encontrado.");

        const oldImage = userFinded.userImage.split('/images/')[1];
        const oldImageRoute = path.join(__dirname, '..', 'public', 'images', oldImage);

        deleteImage(oldImageRoute);

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            principalImage: `${process.env.ROOT_URL}/images/${filename}`
        })

        res.status(200).send("Imágen actualizada correctamente.")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = usersControllers;
