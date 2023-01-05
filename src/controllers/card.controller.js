const path = require('path');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const CardStyle = require(path.join( __dirname, "..", "models", "cardStyle.model" ));
const Card = require(path.join( __dirname, "..", "models", "card.model" ));
const User = require(path.join( __dirname, "..", "models", "user.model" ));
require('dotenv').config();
const VCardCreate = require(path.join( __dirname, "..", "libs", "VCardCreate" ));
const fs = require('fs-extra');
const qrCode = require('qrcode');

const cardController = {};

const createQR = async (id, cardLink) => {
    fs.writeFile(path.join('src', 'public', 'qr', `${id}.png`), 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    const QR = await qrCode.toFile(path.join('src', 'public', 'qr', `${id}.png`), 
    `${process.env.ROOT_URL}/api/user/${cardLink}`, {color: {dark: '#1A120B', light: '#EEEEEE'}});
};

cardController.createCard = async (req, res) => {
    try {
        const { filename } = req.files[0]; // image cover
        const { filename: filename2 } = req.files[1]; // image profile
        const { filename: filename3 } = req.files[2]; // image logo
        const {styles} = req.body;
        let { cardLink } = req.body;
        const { userid } = req.headers;
        const { vcardWants } = req.body;

        const code = v4();

        if(!cardLink) {
            cardLink = code;
        }

        const user = await User.findById(userid);

        if(!user) return res.status(404).json({
            message: 'User not found'
        });

        const alreadyCardLink = await Card.find({cardLink});

        if(alreadyCardLink.length > 0) return res.status(400).json({
            message: 'Tarjeta ya creada con ese link.'
        });

        const newStyleSheet = new CardStyle(JSON.parse(styles));

        const userSocial = [];
        const { socialMedia } = req.body;
        
        for (let i = 0; i < socialMedia.length; i++) {
            userSocial.push(JSON.parse(socialMedia[i]));
        };

        console.log(JSON.parse(styles))

        createQR(code, cardLink);
        VCardCreate({
            firstName: user.firstName,
            lastName: user.lastName,
            organization: req.body.jobEntity,
            title: req.body.jobPosition,
            email: req.body.email,
            workPhone: req.body.cellphone,
            urlPhoto: `${process.env.ROOT_URL}images/${filename2}`, 
            url: `${process.env.FRONTEND_URL}user/${code}`, 
            note: req.body.biography, 
            id: code
        });

        const newCard = new Card({
            ...req.body,
            coverPhoto: `${process.env.ROOT_URL}images/${filename}`,
            perfilImage: `${process.env.ROOT_URL}images/${filename2}`,
            logoPhoto: `${process.env.ROOT_URL}images/${filename3}`,
            cardLink,
            user: userid,
            cardStyle: newStyleSheet._id,
            socialMedia: userSocial,
            historialStyles: [newStyleSheet._id],
            vcard: `${process.env.ROOT_URL}vcard/${code}.vcf`,
            vcardWants,
            imageQr: `${process.env.ROOT_URL}qr/${code}.png`,
        });

        const userCardsOld = user.cards;
        userCardsOld.push(newCard._id);

        await user.updateOne({cards: userCardsOld});
        await newStyleSheet.save();
        await newCard.save();

        res.status(200).json({
            message: 'Card created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating card'
        });
    }
};

cardController.findCard = async (req, res) => {
    try {
        const { cardLink } = req.params;

        const card = await Card.findOne
        ({cardLink})
        .populate('cardStyle')

        if(!card) return res.status(404).json({
            message: 'Card not found'
        });

        res.status(200).json({
            card
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error finding card'
        });
    }
};

module.exports = cardController;