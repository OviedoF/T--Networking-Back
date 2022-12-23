const path = require("path")
const User = require(path.join(__dirname, '..', 'models', 'user.model'));

const usersControllers = {};

usersControllers.getUsers = async (req, res) => {
    try {
        const usersFinded = await User.find();

        res.status(200).send(usersFinded)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = usersControllers;
