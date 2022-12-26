const qrCode = require('qrcode')
const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model.js'))
const fs = require('fs-extra');
require('dotenv').config()

const qrController = {}

const createQR = async (id) => {
    fs.writeFile(path.join('src', 'public', 'qr', `${id}.png`), 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    const QR = await qrCode.toFile(path.join('src', 'public', 'qr', `${id}.png`), 
    'https://www.google.com', {color: {dark: '#1A120B', light: '#EEEEEE'}});
}


qrController.createQr = async (req, res) => {
    try {
        const {id} = req.params;
        const userFinded = await User.findById(id)

        if(!userFinded) return res.status(404).send("Id de usuario no se encuentra.")

        const userData = await User.findById(id, {username: true, nameSubscription: true, daysSubscription: true})

        createQR(userFinded._id)

        await User.findByIdAndUpdate(id, {imageQr: `${process.env.ROOT_URL}/qr/${userFinded._id}.png`})

        res.status(200).send({message: 'Código QR generado.'})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message: 'Código QR no generado.'});
    }
}

qrController.getQr = async (req, res) => {
    try {
        const {id} = req.params
        const userFinded = await User.findById(id, {imageQr: true})

        if(!userFinded) return res.status(404).send("Qr de usuario no encontrada.")

        res.status(200).send(userFinded.imageQr)
    } catch (error) {
        return res.status(500).send({message: 'Código QR no encontrado.'});
    }
}

module.exports = qrController;
