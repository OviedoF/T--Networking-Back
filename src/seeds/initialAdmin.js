const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const {v4} = require('uuid');
const fs = require('fs-extra');
const qrCode = require('qrcode');
require('dotenv').config();

const createQR = async (id) => {
    fs.writeFile(path.join('src', 'public', 'qr', `${id}.png`), 'Learn Node FS module', function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    const QR = await qrCode.toFile(path.join('src', 'public', 'qr', `${id}.png`), 
    `${process.env.ROOT_URL}/api/user/${id}`, {color: {dark: '#1A120B', light: '#EEEEEE'}});
}


const createInitialAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();

        if(count === 0){
            const userRoleId = await Role.findOne({name: 'user'}, {_id: true});
            const adminRoleId = await Role.findOne({name: 'admin'}, {_id: true});

            const qrId = v4();
            createQR(qrId);    

            const admin = new User({
                name: process.env.INITIAL_ADMIN_NAME,
                username: process.env.INITIAL_ADMIN_USERNAME,
                cellphone: process.env.INITIAL_ADMIN_CELLPHONE,
                email: process.env.INITIAL_ADMIN_EMAIL,
                userId: process.env.INITIAL_ADMIN_ID,
                password: await User.encryptPassword(process.env.INITIAL_ADMIN_PASSWORD),
                roles: [userRoleId._id.toString(), adminRoleId._id.toString()],
                userImage: "https://res.cloudinary.com/syphhy/image/upload/v1659924479/5b8626bc2bd5a65d22f2278f57e6ee75_s1bres.gif",
                imageQr: `${process.env.ROOT_URL}/qr/${qrId}.png`
            });

            const adminSaved = await admin.save();

            console.log('Initial admin created.');
            console.log(adminSaved)
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialAdmin;