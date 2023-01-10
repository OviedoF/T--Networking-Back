const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const qrCode = require('qrcode')
const { v4 } = require('uuid')
const fs = require('fs-extra');
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const News = require(path.join(__dirname, '..', 'models', 'news.model'));
const Comments = require(path.join(__dirname, '..', 'models', 'comments.model'));
const membership = require(path.join(__dirname, '..', 'models', 'membership.model'));

const authController = {};

const createQR = async (id) => {
    fs.writeFile(path.join('src', 'public', 'qr', `${id}.png`), 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    const QR = await qrCode.toFile(path.join('src', 'public', 'qr', `${id}.png`), 
    `${process.env.ROOT_URL}/api/user/${id}`, {color: {dark: '#1A120B', light: '#EEEEEE'}});
}

authController.signUp = async (req, res) => {
    try {
        const { filename } = req.files[0];
        const { password, roles } = req.body;
        let arrayRoles;

        const BasicMembership = await membership.findOne({name: 'Básica'});
        const BasicMembershipId = BasicMembership._id;

        if(roles) {
            const userRoles = await Role.find({name: {$in: roles}});
            arrayRoles = userRoles.map(el => el._id);
        } else {
            const userRoles = await Role.findOne({name: 'user'});
            arrayRoles = [userRoles._id];
        }

        const qrId = v4();
        createQR(qrId);

        const newUser = await new User({
            ...req.body,
            userImage: `${process.env.ROOT_URL}/images/${filename}`,
            password: await User.encryptPassword(password),
            roles: arrayRoles,
            imageQr: `${process.env.ROOT_URL}/qr/${qrId}.png`,
            daysMembership: 180,
            userLink: "link usuario",
            membership: [BasicMembershipId],
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, 'FKDOCKODfkpodKCDfkD0F9Dkc90d', {
            expiresIn: 86400
        });

        res.status(201).send({
            token,
            message: 'Usuario registrado correctamente!',
            userData: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

authController.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({
            email: email
        }).populate("roles");

        if(!userFound) return res.status(404).json({
            message: "Email no encontrado, intente de vuelta."
        });

        const matchPassword = await User.comparePassword(password, userFound.password);

        if(!matchPassword) return res.status(404).json({
            token: null,
            message: "Contraseña incorrecta, verifique por favor."
        });

        const token = jwt.sign({id: userFound._id}, 'FKDOCKODfkpodKCDfkD0F9Dkc90d', {
            expiresIn: 86400
        });
        
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

authController.identifyUserJSW = async (req, res) => {
    try {
        const token = req.body.token;
        console.log(token)

        const decoded = jwt.verify(token, 'FKDOCKODfkpodKCDfkD0F9Dkc90d');

        if(!decoded) return res.status(404).send('Usuario no encontrado, por favor ingresa de nuevo.');

        const user = await User.findById(decoded.id, {
            password: false
        }).populate(["membership", 'cards', {
            path: 'cards',
            populate: {
                path: 'cardStyle',
                model: 'CardStyle'
            }
        }]);

        const rolesExist = await Role.find({_id: {$in: user.roles}}, {name: true});

        const userRoles = rolesExist.map(el => el.name);

        const userToSend = {
            ...user._doc,
            roles: userRoles
        }

        res.status(200).send(userToSend);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

authController.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).send(roles);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

authController.deleteUsers = async (req, res) => {
    try {

        const {id} = req.params;
        const userFinded = await User.findById(id)
    
        if(!userFinded) return res.status(404).send("No existe el usuario.");
    
        const newsFinded = await News.deleteMany({author: id})
    
        const commentsFinded = await Comments.deleteMany({author: id})
    
        const dir = path.join(__dirname, '..', 'public', 'qr', id);
        deleteImage(dir);
    
        const imageUser = userFinded.userImage.split('/images/')[1];
        const dirImageUser = path.join(__dirname, '..', 'public', 'images', imageUser);
        deleteImage(dirImageUser)
    
        await User.findByIdAndDelete(id)

        res.status(200).send("Usuario eliminado correctamente.");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

};

authController.googleSignIn = async (req, res) => {
    try {
        const { email, familyName, givenName, googleId, imageUrl, name } = req.body;

        const userFound = await User.findOne({
            email: email,
            googleId: googleId
        }, {
            password: false
        }).populate(["roles", "membership"]);

        if(!userFound) {
            const BasicMembership = await membership.findOne({name: 'Básica'});
            const BasicMembershipId = BasicMembership._id;
            const userRoles = await Role.findOne({name: 'user'});
            arrayRoles = [userRoles._id];
            
            const newUser = await new User({
                firstName: givenName,
                lastName: familyName || ' ',
                username: name,
                email: email,
                googleId: googleId,
                userImage: `${process.env.ROOT_URL}images/userimage.png`,
                roles: arrayRoles,
                password: await User.encryptPassword(googleId),
                membership: [BasicMembershipId],
                daysMembership: 365,
                userId: googleId
            });

            const savedUser = await newUser.save();

            const token = jwt.sign({id: savedUser._id}, 'FKDOCKODfkpodKCDfkD0F9Dkc90d', {
                expiresIn: 86400
            });

            res.status(201).send({
                token,
                message: 'Usuario registrado correctamente!',
                ...savedUser._doc,
                membership: [BasicMembership],
                roles: arrayRoles
            })

        } else {
            const token = jwt.sign({id: userFound._id}, 'FKDOCKODfkpodKCDfkD0F9Dkc90d', {
                expiresIn: 86400
            });

            const actualizedUser = await User.findByIdAndUpdate(userFound._id, {
                googleId: googleId,
            }, {new: true});

            res.status(200).json({
                token,
                message: 'Usuario logueado correctamente!',
                ...userFound._doc
            });
        }

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send(error);
    }
};



module.exports = authController;