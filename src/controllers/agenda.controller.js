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
const nodemailer = require('nodemailer');
const MembershipEmails = require(path.join(__dirname, '..', 'emails', 'MembershipEmails.js'));
require('dotenv').config();

const agendaController = {};

const sendMembershipEmail = async (user, daysMembership) => {
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
    'https://networking.eichechile.com/', 'Networking APP', daysMembership, "A usted le quedan")

    await transporter.sendMail({
        from: `Networking APP <${process.env.MAIL_USERNAME}>`,
        to: user.email,
        subject: `Networking APP - ${daysMembership} dias de membresia restantes!`,
        html: messageHtml
    })
};

agendaController.discountDays = async (req, res) => {
    try {

        const basicMembership = await membership.findOne({name: 'Básica'});

        const users = await User.find({ "membership": { "$ne": basicMembership._id } });

        users.forEach(async (user) => {
            console.log(`${user.firstName} ${user.lastName} tiene ${user.daysMembership} días de membresía`);

            const newDaysMembership = user.daysMembership - 1;

            if(user.daysMembership > 0) {
                await User.findByIdAndUpdate(user._id, {
                    daysMembership: newDaysMembership
                })
            } else {
                await User.findByIdAndUpdate(user._id, {
                    membership: [basicMembership._id]
                })
            }

            if(newDaysMembership === 30 || newDaysMembership === 15 || newDaysMembership === 7 || newDaysMembership === 3 || newDaysMembership === 1    ) {
                sendMembershipEmail(user, newDaysMembership);
            }

        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = agendaController;