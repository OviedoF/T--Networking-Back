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

const agendaController = {};

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
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = agendaController;