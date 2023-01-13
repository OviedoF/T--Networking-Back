const path = require('path');
const Networking = require(path.resolve('src', 'models', 'networking.model.js'));

const createNetworking = async () => {
    const count = await Networking.countDocuments();
    if (count > 0) return;

    const values = {
            street: 'calle 1',
            city: 'ciudad 1',
            region: 'región 1',
            email: 'email@email.com',
            phone: '123456789',
            aboutWeText: 'texto de nosotros',
            whatsApp: '123456789',
            facebook: 'facebook.com',
            instagram: 'instagram.com',
            twitter: 'twitter.com',
            linkedin: 'linkedin.com',
    }

    const networking = new Networking(values);

    await networking.save();
}

module.exports = createNetworking;