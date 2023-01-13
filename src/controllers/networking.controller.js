const path = require('path');
const Networking = require(path.resolve('src', 'models', 'networking.model.js'));
const deleteImage = require(path.resolve('src', 'libs', 'dirLibrary.js'));
const fs = require('fs-extra');

const networkingController = {};

networkingController.editNetworking = async (req, res) => {
    try{
        const networking = await Networking.findOne();

        if(!networking) return res.status(404).json({message: 'Networking not found'});

        if(req.files[0]) {
            const {filename} = req.files[0];

            if(networking.aboutWeImage){
                const imagePath = path.resolve('src', 'public', networking.aboutWeImage);
                const exists = fs.existsSync(imagePath);
                if(exists) deleteImage(imagePath);
            }

            const updatedNetworking = await Networking.findByIdAndUpdate(networking._id, {
                aboutWeImage: `${process.env.ROOT_URL}/images/${filename}`,
                ...req.body
            }, {new: true});
            res.status(200).json(updatedNetworking);
        } else {
            const updatedNetworking = await Networking.findByIdAndUpdate(networking._id, {
                ...req.body
            }, {new: true});
            res.status(200).json(updatedNetworking);
        }
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

networkingController.getNetworking = async (req, res) => {
    try{
        const networking = await Networking.findOne();
        if(!networking) return res.status(404).json({message: 'Networking not found'});
        res.status(200).json(networking);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

module.exports = networkingController;

