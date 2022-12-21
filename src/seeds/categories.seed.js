const path = require('path');
const Category = require(path.join(__dirname, '..', 'models', 'category.model'));
require('dotenv').config();

const createInitialCategories = async () => {
    try {
        const count = await Category.estimatedDocumentCount();

        if(count === 0){
            

            const adminSaved = await admin.save();

            console.log('Initial admin created.');
            console.log(adminSaved)
        }
    
    } catch (error) {
        console.error(error);
    }
};

module.exports = createInitialCategories;