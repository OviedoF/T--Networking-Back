const path = require('path');
const Category = require(path.join(__dirname, '..', 'models', 'category.model'));
require('dotenv').config();

const categories = [{
    name: 'Tarjeta Biznes',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-biznes/tarjetas-banamex-biznes-1.jpg',
}, {
    name: 'Tarjeta Pro',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-pro/tarjetas-banamex-pro-1.jpg',
}, {
    name: 'Accesorios',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-pro/tarjetas-banamex-pro-1.jpg',
}, {
    name: 'Founder Pack',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-pro/tarjetas-banamex-pro-1.jpg',
}, {
    name: 'Eventos',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-pro/tarjetas-banamex-pro-1.jpg',
}, {
    name: 'Biznes Box',
    imageUrl: 'https://www.banamex.com/content/dam/banamex/imagenes/tarjetas/tarjetas-banamex/tarjetas-banamex-pro/tarjetas-banamex-pro-1.jpg',
}];

const createInitialCategories = async () => {
    try {
        const count = await Category.estimatedDocumentCount();

        if(count === 0){
            
            for (const category of categories)  {
                const newCategory = new Category(category);
                await newCategory.save();
            }

            console.log('Categories created successfully');
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialCategories;