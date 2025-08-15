const express=require('express');
const router=express.Router();
const {body, validationResult} = require("express-validator");
const userController=require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be at least 3 character long'),
    body('password').isLength({min : 6}).withMessage('password must be at least 6 character long')
]
,userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min : 6}).withMessage('password must be at least 6 character long')
], userController.loginUser);

// Protected route to get user profile with help of header token 
router.get('/profile',authMiddleware.authUser  , userController.getUserProfile);

router.get('/logout', authMiddleware.authUser,userController.logoutUser);

module.exports=router;   