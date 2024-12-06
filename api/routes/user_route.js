const { getUsers, login, deleteUser, updateUser, addUser } = require('../controllers/users')
const express = require('express')
const router = express.Router()

// router.get('/', getUsers)
router.get('/', (req,res)=>{
    res.json({msg: "Hello Users"})
})
router.post('/auth/login', login)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.post('/auth/sign-up', addUser)

module.exports = router