import express from 'express';
import {  addcart, cartproductdelete, getAllbooks, getbanner, getbookbyId, getCartProduct, getuserAllbooks, getwishbooks, wishbook } from '../controller/userController.js';
import { authregistration, userlogin } from '../controller/authController.js';
import { protect } from '../middleware/protect.js';
import { addbanner } from '../controller/adminController.js';
import { upload } from '../middleware/upload.js';
const router = express.Router();


router.get('/' ,getAllbooks );
router.get('/user' ,protect,getuserAllbooks );
router.get('/book/:id',getbookbyId)
router.post('/registration',authregistration)
router.post('/login',userlogin)

router.post("/wishbook/:id",protect,wishbook)

router.get("/wishlist",protect,getwishbooks)

router.get("/getbanner",getbanner)


router.post('/cart/:id',protect,addcart)
router.get('/cartproducts',protect,getCartProduct)
router.delete('/cartdelete/:id',protect,cartproductdelete)
export default router
