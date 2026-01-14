const express = require('express')
const {registerController}=require('../controllers/userController.js')
const {loginController}=require('../controllers/userController.js')
const router = express.Router();


//Register
router.post('/register',registerController) 

//login
router.post('/login',loginController)




module.exports = router;