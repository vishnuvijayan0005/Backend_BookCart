import express from 'express';
import { addnewbook, deletebook, getcategorychart, getsellerBooks, updatebook } from '../controller/sellerController.js';
import { getAllbooks, getbookbyId } from '../controller/userController.js';
import { protect } from '../middleware/protect.js';
import { upload } from '../middleware/upload.js';
const router = express.Router();


router.post('/newbook',protect, upload.single("image"), addnewbook);
router.get('/book/:id',getbookbyId)
router.get('/',protect,getsellerBooks)
router.get('/dashboard',protect)
router.delete("/deletebook/:id",deletebook)
router.put("/updatebook/:id",upload.single("image"),updatebook)
router.get("/categorychart",getcategorychart)
export default router
