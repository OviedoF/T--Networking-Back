const path = require('path');
require('dotenv').config();
// const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const nodemailer = require('nodemailer');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const LogInEmail = require(path.join(__dirname, '..', 'emails', 'LogIn.js'))
const ConfirmingPurchaseEmail = require(path.join(__dirname, '..', 'emails', 'ConfirmingPurchaseEmail.js'))
const MembershipEmails = require(path.join(__dirname, '..', 'emails', 'MembershipEmails.js'))

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
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'emibarto@live.com.ar',
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

emailsController.confirmingPurchase = async (req, res) => {
    try {
        const { email, trackingCode } = req.body;
        
        const user = await User.findOne({email})

        if(!user) return res.status(404).send('No se ha encontrado el usuario.');

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

        const messageHtml = ConfirmingPurchaseEmail("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png", "Se ha enviado su pedido!",
        `Hola ${user.name}, gracias por confiar en nosotros!`, "Con este codigo segui el paso de tu pedido!", 'https://networking.eichechile.com/', trackingCode ,'Networking APP')

        const emailSended = await transporter.sendMail({
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'emibarto@live.com.ar',
            subject: 'Networking APP - Compra exitosa!',
            html: messageHtml
        })

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });

    } catch (error) {
        console.log(error);
    }
}

emailsController.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({email})

        if(!user) return res.status(404).send('No se ha encontrado el usuario.');

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

        const messageHtml = ConfirmingPurchaseEmail("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png", `${user.name}, su codigo para recuperar su contraseña esta aqui`,
        `Hemos recibido una solicitud de cambio de contraseña para tu usuario de Networking. Si crees que este correo es un error, por favor ignóralo. Por el contrario, usa el siguiente código
        en la ventana de <a style="font-size: 20px;" href="networking.eichechile.com">networking.eichechile.com</a> para poder cambiar tu contraseña con éxito, recuerda distinguir entre mayúsculas y minúsculas. 
        Muchas gracias por confiar en nosotros!`, "No olvides anotar tu contraseña en un lugar seguro, para no perderla y que no te la roben!", 'https://networking.eichechile.com/', 'Networking APP')

        const emailSended = await transporter.sendMail({
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'emibarto@live.com.ar',
            subject: "Networking APP - Codigo de recuperacion",
            html: messageHtml
        })

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
}

emailsController.verificationRegistration = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({email})

        if(!user) return res.status(404).send('No se ha encontrado el usuario.');

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

        const messageHtml = ConfirmingPurchaseEmail("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png", `${user.name}, su codigo de verificacion esta aqui`,
        `Gracias por crear una cuenta con nosotros, su confianza en networking es valorada`, "Ahora a disfrutar de todo lo que Networking tiene para ti!",
        'https://networking.eichechile.com/', 'Networking APP')

        const emailSended = await transporter.sendMail({
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'emibarto@live.com.ar',
            subject: "Networking APP - Codigo de verificacion",
            html: messageHtml
        })

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
}

emailsController.thirtyDays = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({email})

        if(!user) return res.status(404).send('No se ha encontrado el usuario.');

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

        const messageHtml = MembershipEmails("https://res.cloudinary.com/syphhy/image/upload/v1672259034/logo_cplmck.png",
        'https://networking.eichechile.com/', 'Networking APP', 30, "A usted le quedan")

        const emailSended = await transporter.sendMail({
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'emibarto@live.com.ar',
            subject: "Networking APP - 30 dias de membresia restantes!",
            html: messageHtml
        })

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
}

emailsController.sendRequest = async (req, res) => {
    try {
        const { name, email, type, message } = req.body;

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

        const messageHtml = `
            <h1>${type}</h1>
            <h2>Nombre: ${name}</h2>
            <h2>Email: ${email}</h2>
            <h2>Mensaje: <p>${message}</p></h2>
        `

        const emailSended = await transporter.sendMail({
            from: `Networking APP <${process.env.MAIL_USERNAME}>`,
            to: 'oviedofederico039@gmail.com',
            subject: `Biznes - ${type}`,
            html: messageHtml
        })

        res.status(201).send({
            message: 'Email enviado con exito!'
        });
    } catch (error) {
        console.log(error);
    }
}
        

module.exports = emailsController;