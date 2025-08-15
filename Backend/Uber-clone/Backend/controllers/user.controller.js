const userService = require("../services/user.service");

module.exports.registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const newUser = await userService.createUser({ firstname, lastname, email, password });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}