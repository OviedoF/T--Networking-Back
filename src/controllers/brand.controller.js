const path = require('path');
const Brand = require(path.join(__dirname, '..', 'models', 'brands.model'));
const deleteImage = require(path.join(__dirname, '..', 'libs', 'dirLibrary'));

const brandsControllers = {};

brandsControllers.getBrands = async (req, res) => {
    try {
        const brandsFinded = await Brand.find();

        res.status(200).send(brandsFinded);
    } catch (error) {
        const {message} = error;
        console.log(error);
        return res.status(500).send(message);
    }
}

brandsControllers.createBrand = async (req, res) => {
    try {
        const {filename} = req.files[0];
        const {name} = req.body;
        const logo = `${process.env.ROOT_URL}/images/${filename}`;

        const newBrand = new Brand({
            name,
            logo
        })

        const brandSaved = await newBrand.save();

        res.status(201).send({
            message: 'Marca creada con éxito!',
            brand: brandSaved
        })
    } catch (error) {
        const {filename} = req.files[0];
        const routeImagesFolder = path.join(__dirname, '..', 'public', 'images', filename);
        await deleteImage(routeImagesFolder);
        const {message} = error;
        console.log(error);
        return res.status(500).send(message);
    }
}

brandsControllers.deleteBrand = async (req, res) => {
    try {
        const {id} = req.params;
        const brandFinded = await Brand
            .findById(id)

        if(!brandFinded) return res.status(404).send('No se ha encontrado la marca.')

        const {logo} = brandFinded;
        const filename = logo.split('/images/')[1];
        const routeImagesFolder = path.join(__dirname, '..', 'public', 'images', filename);

        await deleteImage(routeImagesFolder);

        await Brand.findByIdAndDelete(id);

        res.status(200).send({

            message: 'Marca eliminada con éxito!',
            brand: brandFinded
        })
    } catch (error) {
        const {message} = error;
        console.log(error);
        return res.status(500).send(message);
    }
}

module.exports = brandsControllers;