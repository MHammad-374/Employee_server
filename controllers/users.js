const mongoose = require('mongoose')
const User = require('../models/users')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        if(!email.includes("@") || !email.includes(".")) {
            return res.status(400).json({ message: "Email is not valid" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password === password ? res.status(200).json({ message: "Login successful", role: user.role, name: user.name }) : res.status(401).json({ message: "Invalid Passwrd" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findOneAndDelete({ _id: id })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User not found" });
        }
        const { name, email } = req.body     // For get data from frontend use -> app.use(express.json());
        if (!name || !email) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOneAndUpdate({ _id: id }, req.body)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body     // For get data from frontend use -> app.use(express.json());
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ name, email, password })
        await newUser.save().then(() => {
            res.status(201).json({ message: "Your acccount has been created" });;
        }).catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = {
    getUsers,
    login,
    deleteUser,
    updateUser,
    addUser
}