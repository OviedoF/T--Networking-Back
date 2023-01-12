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
        const perfilImage = req.files[0] || false; // image profile
        let imageCover = req.files[1] || false; // image cover
        let logoImage = req.files[2] || false; // image logo
        const {styles} = req.body;
        let { cardLink } = req.body;
        const { userid } = req.headers;
        const { vcardWants } = req.body;
        console.log(cardLink, 'cardLink');

        const code = v4();

        const user = await User.findById(userid);

        if(!user) return res.status(404).json({
            message: 'User not found'
        });
        
        const alreadyCardLink = await Card.find({cardLink});

        if(alreadyCardLink.length > 0) return res.status(400).json({
            message: 'Tarjeta ya creada con ese link, ve a la pestaña de "datos" y actualiza tu link.'
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
            urlPhoto: `${process.env.ROOT_URL}images/${perfilImage.filename}`, 
            url: `${process.env.FRONTEND_URL}user/${code}`, 
            note: req.body.biography, 
            id: code
        });

        const newCard = new Card({
            ...req.body,
            coverPhoto: imageCover ? `${process.env.ROOT_URL}images/${imageCover.filename}` : false,
            perfilImage: perfilImage ? `${process.env.ROOT_URL}images/${perfilImage.filename}` : false,
            logoPhoto: logoImage ? `${process.env.ROOT_URL}images/${logoImage.filename}` : false,
            cardLink: cardLink ? cardLink : code,
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

        const userToSend = await user.updateOne({cards: userCardsOld}, {
            new: true
        }).populate(['cards', 'membership', 'roles']);
        await newStyleSheet.save();
        await newCard.save();

        res.status(200).json(userToSend);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error creating card'
        });
    }
};

cardController.updateCard = async (req, res) => {
    try {
        const { cardid } = req.params;
        const { userid } = req.headers;
        const perfilImage = req.files[0] || false; // image profile
        let imageCover = req.files[1] || false; // image cover
        let logoImage = req.files[2] || false; // image logo
        const {styles} = req.body;
        let { cardLink } = req.body;
        const { vcardWants } = req.body;

        const code = v4();

        const user = await User.findById(userid);

        if(!user) return res.status(404).json({
            message: 'User not found'
        });

        const card = await Card.findById(cardid);

        if(!card) return res.status(404).json({
            message: 'Card not found'
        });

        const alreadyCardLink = await Card.find({cardLink});

        if(alreadyCardLink.length > 0 && alreadyCardLink[0]._id.toString() !== cardid) {
            console.log(alreadyCardLink[0]._id.toString(), cardid)
            
            return res.status(400).json({
                message: 'Tarjeta ya creada con ese link, ve a la pestaña de "datos" y actualiza tu link.'
            })
        };

        const actualizeCardStyle = await CardStyle.findByIdAndUpdate(card.cardStyle, {
            ...JSON.parse(styles)
        });

        const userSocial = [];
        const { socialMedia } = req.body;
        
        for (let i = 0; i < socialMedia.length; i++) {
            userSocial.push(JSON.parse(socialMedia[i]));
        };

        createQR(code, cardLink);

        VCardCreate({
            firstName: user.firstName,
            lastName: user.lastName,
            organization: req.body.jobEntity,
            title: req.body.jobPosition,
            email: req.body.email,
            workPhone: req.body.cellphone,
            urlPhoto: `${process.env.ROOT_URL}images/${perfilImage.filename}`, 
            url: `${process.env.FRONTEND_URL}user/${code}`, 
            note: req.body.biography, 
            id: code
        });

        const newCard = await Card.findByIdAndUpdate(cardid, {
            ...req.body,
            coverPhoto: imageCover ? `${process.env.ROOT_URL}images/${imageCover.filename}` : card.imageCover,
            perfilImage: perfilImage ? `${process.env.ROOT_URL}images/${perfilImage.filename}` : card.perfilImage,
            logoPhoto: logoImage ? `${process.env.ROOT_URL}images/${logoImage.filename}` : card.logoPhoto,
            cardLink,
            socialMedia: userSocial,
            historialStyles: [...card.historialStyles, actualizeCardStyle._id],
            vcard: `${process.env.ROOT_URL}vcard/${code}.vcf`,
            vcardWants,
            imageQr: `${process.env.ROOT_URL}qr/${code}.png`,
        });

        res.status(200).json({
            message: 'Card updated'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating card'
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