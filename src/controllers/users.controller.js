const path = require("path")
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const deleteImage = require(path.join(__dirname, '..', 'libs', 'dirLibrary'));

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

usersControllers.getAdminUser = async (req, res) => {
    try {
        const roleAdmin = await Role.findOne({ name: 'admin' });
        const adminUser = await User.findOne({ roles: roleAdmin._id }, { password: false });

        console.log(adminUser);

        res.status(200).send(adminUser)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error al obtener el usuario administrador'
        })

    }
}   

usersControllers.getUserById = async (req, res) => {
    try {
        const userFinded = await User.findById(req.params.id, { password: false });
        
        if (!userFinded) {
            return res.status(404).send({
                message: 'No se encontró el usuario'
            })
        }

        res.status(200).send(userFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error al obtener el usuario'
        })
    }
}

usersControllers.updateUserAdmin = async (req, res) => {
    try {

        const {id} = req.params;
        const userFinded = await User.findById(id)

        if(!userFinded) return res.status(404).send("Admin no encontrado.")

        const userUpdated = await User.findByIdAndUpdate(id, req.body, {new: true})

        res.status(200).send(userUpdated)
    } catch (error) {
        return res.status(500).send({message: 'Usuario admin no modificado.'});
    }
}

usersControllers.updateUserAdminImage = async (req, res) => {
    try {
        const {id} = req.params;
        const userFinded = await User.findById(id)
        const {filename} = req.files[0];

        if(!userFinded) return res.status(404).send("Admin no encontrado.");

        const oldImage = userFinded.userImage.split('/images/')[1];
        const oldImageRoute = path.join(__dirname, '..', 'public', 'images', oldImage);

        deleteImage(oldImageRoute);

        const updatedProduct = await Product.findByIdAndUpdate(id, {
            principalImage: `${process.env.ROOT_URL}/images/${filename}`
        })

        res.status(200).send("Imágen admin actualizada correctamente.")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

usersControllers.updateSocialMedia = async (req, res) => {
    try {
        console.log('conchetumare')
        const {id} = req.params;
        const userFinded = await User.findById(id)

        if(!userFinded) return res.status(404).send("Usuario no encontrado.")

        const userUpdated = await User.findByIdAndUpdate(id, {
            socialMedia: req.body.socialMedia
        }, {new: true});

        console.log(userUpdated);

        res.status(200).send(userUpdated)
    } catch (error) {
        return res.status(500).send({message: 'Usuario no modificado.'});
    }
}

usersControllers.actualizeShoppingCart = async (req, res) => {
    try {
        const {id} = req.params;
        const {type, product, productid} = req.body;

        const userFinded = await User.findById(id);
        let shoppingCart = userFinded.shoppingCart;

        if(!userFinded) return res.status(404).send("Usuario no encontrado.")

        console.log(shoppingCart)

        if(type === 'add') {
            shoppingCart.push(JSON.parse(product));
        }

        if(type === 'remove') {
            shoppingCart = shoppingCart.filter(product => JSON.parse(product).id !== productid)
        }

        console.log(shoppingCart);

        const userUpdated = await User.findByIdAndUpdate(id, {
            shoppingCart
        }, {new: true});

        res.status(200).send(userUpdated)
    } catch (error) {
        return res.status(500).send({message: 'Usuario no modificado.'});
    }
}

module.exports = usersControllers;
