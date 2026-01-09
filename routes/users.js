import express from 'express';
import {  getAllbooks, getbanner, getbookbyId, getuserAllbooks, getwishbooks, wishbook } from '../controller/userController.js';
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
export default router
