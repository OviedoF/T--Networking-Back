const path = require('path');
const User = require(path.join(__dirname, '..', 'models', 'user.model'));
const Role = require(path.join(__dirname, '..', 'models', 'role.model'));
const Membership = require(path.join(__dirname, '..', 'models', 'membership.model'));
const VCardCreate = require(path.join(__dirname, '..', 'libs', 'VCardCreate'));
const {v4} = require('uuid');
const fs = require('fs-extra');
const qrCode = require('qrcode');
require('dotenv').config();

const createQR = async (id) => {
    fs.ensureDirSync(path.join('src', 'public', 'qr'));

    fs.writeFile(path.join('src', 'public', 'qr', `${id}.png`), 'Template QR', function (err) {
        if (err) throw err;
        console.log('QR is created successfully.');
    });

    const QR = await qrCode.toFile(path.join('src', 'public', 'qr', `${id}.png`), 
    `${process.env.FRONTEND_URL}/user/${id}`, {color: {dark: '#1A120B', light: '#EEEEEE'}});
}

const createInitialAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();

        if(count === 0){
            let userRole = '';
            let adminRole = '';
            let membership = {};

            const roles = await Role.find({name: {$in: ['user', 'admin']}}, {_id: true});
            const membershipFinded = await Membership.findOne({name: 'Básica'},);

            if(roles.length > 0 && membershipFinded){
                userRole = roles[0]._id;
                adminRole = roles[1]._id;
                membership = membershipFinded;
            }else{
                console.log('Roles and membership are not created yet, waiting 5 seconds...');

                setTimeout(() => {
                   return createInitialAdmin();
                }, 5000);
            }

            const qrId = v4();
            createQR(qrId);    

            const vcardId = v4();

            const admin = new User({
                firstName: process.env.INITIAL_ADMIN_FIRSTNAME,
                lastName: process.env.INITIAL_ADMIN_LASTNAME,
                username: process.env.INITIAL_ADMIN_USERNAME,
                cellphone: process.env.INITIAL_ADMIN_CELLPHONE,
                email: process.env.INITIAL_ADMIN_EMAIL,
                userId: process.env.INITIAL_ADMIN_ID,
                password: await User.encryptPassword(process.env.INITIAL_ADMIN_PASSWORD),
                roles: [userRole, adminRole],
                userImage: "https://res.cloudinary.com/syphhy/image/upload/v1672428122/vaporwave-background-vector_hhkdr6.webp",
                imageQr: `${process.env.ROOT_URL}/qr/${qrId}.png`,
                membership: membership._id,
                daysMembership: membership.days,
                backgroundImage: "https://res.cloudinary.com/syphhy/image/upload/v1672428130/animated-anime_t1ccmm.gif",
                biography: 'I am the initial admin, i have the control of all, i am all. Sky is the limit for me and i am the limit for the sky.',
                job: 'CEO',
                organization: 'Networking',
                location: {
                    country: 'Argentina',
                    city: 'Buenos Aires',
                    address: 'Av. Corrientes 1234'
                },
                vcard: `${process.env.ROOT_URL}vcard/${vcardId}.vcf`,
                userLink: vcardId
            });

            VCardCreate({
                firstName: admin.firstName,
                lastName: admin.lastName,
                organization: admin.organization,
                title: admin.job,
                email: admin.email,
                workPhone: admin.cellphone,
                urlPhoto: admin.userImage, 
                url: `${process.env.FRONTEND_URL}user/${vcardId}`, 
                note: admin.biography, id: vcardId
            });

            const adminSaved = await admin.save();
            console.log('Initial admin created.');
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialAdmin;