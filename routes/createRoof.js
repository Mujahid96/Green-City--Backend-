const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {createRoof}=require("../controllers/createRoof");

const { 
    productById,
    read,
    photo
   } = require('../controllers/product');

router.post('/createRoof/:userId',requireSignin,isAuth,createRoof);

router.get('/product/:productId', read);
router.get('/product/photo/:productId', photo);


router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
