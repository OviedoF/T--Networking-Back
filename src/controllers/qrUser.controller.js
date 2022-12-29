const qrCode = require('qrcode')
const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model.js'))
const fs = require('fs-extra');
require('dotenv').config()

const qrController = {}

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

qrController.getDataQr = async (req, res) => {
    try {
        const {id} = req.params
        const userFinded = await User.findById(id, {imageQr: true})

        if(!userFinded) res.status(404).send("Usuario no encontrado.")

        console.log(userFinded)

        res.status(200).send(userFinded.imageQr)
    } catch (error) {
        return res.status(500).send({message: 'Id no encontrado.'});
    }
}

module.exports = qrController;
