const path = require('path');
const Membership = require(path.join('..', 'models', 'membership.model'));
const {v4} = require('uuid');
const fs = require('fs-extra');
require('dotenv').config();

const principalMemberships = [{
    name: 'Básica',
    description: 'Membresía básica',
    price: 0,
    days: 180,
    priceWithOffer: 0,
    image: 'https://res.cloudinary.com/syphhy/image/upload/v1672427097/image-removebg-preview_18_yffpzs.png',
}, {
    name: 'BIznes Pro',
    description: 'Membresía Biznes Pro',
    price: 16964.99,
    days: 60,
    priceWithOffer: 0,
    image: 'https://res.cloudinary.com/syphhy/image/upload/v1672425779/image-removebg-preview_17_f6qfjh.png'
}, {
    name: 'Biznes VIP',
    description: 'Membresía Biznes VIP',
    price: 50894.99,
    days: 60,
    priceWithOffer: 0,
    image: 'https://res.cloudinary.com/syphhy/image/upload/v1672425779/image-removebg-preview_17_f6qfjh.png'
}]

const createMemberships = async () => {
    try {
        const count = await Membership.estimatedDocumentCount();

        if(count === 0){
            principalMemberships.forEach(async (membership) => {


            const membershipCreated = new Membership({
                name: membership.name,
                description: membership.description,
                price: membership.price,
                days: membership.days,
                priceWithOffer: membership.priceWithOffer,
                image: membership.image
            });

            await membershipCreated.save();

            console.log(membershipCreated.description + ' created.');
        })
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createMemberships;