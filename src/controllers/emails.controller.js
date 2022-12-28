const path = require('path');
require('dotenv').config();
// const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const nodemailer = require('nodemailer');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const LogInEmail = require(path.join(__dirname, '..', 'emails', 'LogIn.js'))

const emailsController = {};

emailsController.registrySuccess = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).send('No se ha encontrado el usuario.');

        console.log(user.userImage)

        const transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const messageHtml = LogInEmail("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png", 'Bienvenido a Networking', 
        user.name, `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam.`, 
        `https://networking.eichechile.com/user/${user._id}`, 'Vé tu perfil!', 
        'de parte de', 'https://networking.eichechile.com/', 'Networking APP');

        const emailSended = await transporter.sendMail({
            from: `'Networking APP' <${process.env.MAIL_USERNAME}>`,
            to: 'oviedofederico039@gmail.com',
            subject: 'Networking APP - Solicitud de cambio de contraseña',
            html: messageHtml
        })

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = emailsController;