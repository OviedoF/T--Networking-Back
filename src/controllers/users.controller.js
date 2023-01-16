const path = require("path")
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const deleteImage = require(path.join(__dirname, '..', 'libs', 'dirLibrary'));
const Product = require(path.join(__dirname, '..', 'models', 'product.model'));

const usersControllers = {};

usersControllers.getAllUsers = async (req, res) => {
    try {
        const usersFinded = await User.find({
            '$or': [
                {
                    privacyType: 'public'
                },{
                    privacyType: 'private',
                }
            ]
        }).populate(['roles', 'membership', 'cards']);

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
        const userFinded = await User.findById(req.params.id, { password: false }).populate(['roles', 'membership', 'cards']);
        
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
        const {type, product} = req.body;

        const userFinded = await User.findById(id);
        let shoppingCart = userFinded.shoppingCart;

        if(!userFinded) return res.status(404).send("Usuario no encontrado.")

        if(type === 'add') {
            const productFinded = await Product.findById(req.body.product);

            const objectToCart = {
                ...productFinded._doc,
                quantity: req.body.quantity,
                colorSelected: req.body.color,
                linkToRedirect: req.body.linkToRedirect,
                files: []
            }
    
            req.files.forEach((file) => {
                objectToCart.files.push(`${process.env.ROOT_URL}images/${file.filename}`);
            })

            shoppingCart.push(objectToCart);
        }

        if(type === 'remove') {
            const productIndex = shoppingCart.findIndex((productCart) => productCart._id === product._id);
            
            product.files.forEach((file) => {
                const oldImage = file.split('/images/')[1];
                const oldImageRoute = path.join(__dirname, '..', 'public', 'images', oldImage);

                deleteImage(oldImageRoute);
            });

            shoppingCart.splice(productIndex, 1);
        }

        const userUpdated = await User.findByIdAndUpdate(id, {
            shoppingCart
        }, {new: true}).populate(['membership', 'cards']);

        res.status(200).send({
            ...userUpdated._doc
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'Usuario no modificado.'});
    }
}

usersControllers.updateUser = async (req, res) => {
    try {
        const {id} = req.params;

        const userFinded = await User.findById(id);

        if(!userFinded) return res.status(404).send({
            message: 'Usuario no encontrado.'
        })

        if(req.files[0]){
            const {filename} = req.files[0];

            const userUpdated = await User.findByIdAndUpdate(id, {
                ...req.body,
                userImage: `${process.env.ROOT_URL}/images/${filename}`
            }, {
                new: true
            }).populate(['roles', 'membership', 'cards'])

            return res.status(200).send(userUpdated)
        }
        
        const userUpdated = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })

        return res.status(200).send(userUpdated)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: 'Usuario no modificado.'});
    }
}

module.exports = usersControllers;
