const path = require('path');
require('dotenv').config();
// const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const nodemailer = require('nodemailer');

const emailsController = {};

emailsController.registrySuccess = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
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

        const messageHtml = `<div styles="border-radius: 20px;">
            <h1 style="padding: 10px; text-align: center; font-weight: 200;">Bienvenido a NetWorking</h1>
            <p style="font-size: 20px;  padding: 10px;">
                Se ha completado tu registro correctamente. Ahora puedes disfrutar de todas las ventajas que te ofrece nuestra plataforma accediendo con tu usuario y contraseña.
                Muchas gracias por confiar en nosotros! 
            </p>

            <p style="font-size: 20px;  padding: 10px;">
                Si no has solicitado este cambio de contraseña o tienes algún problema, no dudes en contactarnos mediante la sección de "ayuda" de la página principal o 
                enviando un correo electrónico a <a style="font-size: 20px;" href="">networking@eiche.cl</a>
            </p>
        </div>`;

        const emailSended = await transporter.sendMail({
            from: `'Networking APP' <${process.env.MAIL_USERNAME}>`,
            to: newRequest.email,
            subject: 'Networking APP - Solicitud de cambio de contraseña',
            html: messageHtml
        })

        await newRequest.save();

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
};

emailsController.purchaseSuccess = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
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

        const messageHtml = `<div styles="border-radius: 20px;">
            <h1 style="padding: 10px; text-align: center; font-weight: 200;">Compra exitosa</h1>
            <p style="font-size: 20px;  padding: 10px;">
                Se ha completado tu compra correctamente. Ahora puedes disfrutar de todas las ventajas que te ofrece nuestra plataforma accediendo con tu usuario y contraseña.
                Muchas gracias por confiar en nosotros! 
            </p>

            <p style="font-size: 20px;  padding: 10px;">
                Si no has solicitado este cambio de contraseña o tienes algún problema, no dudes en contactarnos mediante la sección de "ayuda" de la página principal o 
                enviando un correo electrónico a <a style="font-size: 20px;" href="">networking@eiche.cl</a>
            </p>
        </div>`;

        await transporter.sendMail({
            from: `'Networking APP' <${process.env.MAIL_USERNAME}>`,
            to: newRequest.email,
            subject: 'Networking APP - Solicitud de cambio de contraseña',
            html: messageHtml
        })
        
        await newRequest.save();

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
};

emailsController.oneMonthToMembership = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
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

        const messageHtml = `<div styles="border-radius: 20px;">
            <h1 style="padding: 10px; text-align: center; font-weight: 200;">Bienvenido a NetWorking</h1>
            <p style="font-size: 20px;  padding: 10px;">
                Se ha completado tu registro correctamente. Ahora puedes disfrutar de todas las ventajas que te ofrece nuestra plataforma accediendo con tu usuario y contraseña.
                Muchas gracias por confiar en nosotros! 
            </p>

            <p style="font-size: 20px;  padding: 10px;">
                Si no has solicitado este cambio de contraseña o tienes algún problema, no dudes en contactarnos mediante la sección de "ayuda" de la página principal o 
                enviando un correo electrónico a <a style="font-size: 20px;" href="">networking@eiche.cl</a>
            </p>
        </div>`;

        await transporter.sendMail({
            from: `'Networking APP' <${process.env.MAIL_USERNAME}>`,
            to: newRequest.email,
            subject: 'Networking APP - Solicitud de cambio de contraseña',
            html: messageHtml
        })
        
        await newRequest.save();

        res.status(201).send({
            image: user.userImage,
            userId: user._id
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = emailsController;