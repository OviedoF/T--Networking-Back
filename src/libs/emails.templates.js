require('dotenv').config();
const nodemailer = require('nodemailer')

const sendEmail = async (message, email, affair) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const emailSended = await transporter.sendMail({
            from: `'Networking APP' <${process.env.MAIL_USERNAME}>`,
            to: email,
            subject: `Networking APP - ${affair}`,
            html: message
        })

        res.status(200).send('Message sent: ', emailSended.messageId)
    } catch (error) {
        console.log(error);
    }
}