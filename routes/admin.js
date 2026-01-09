import express from "express";
import { addbanner, addcategory, deletuser, getcategories, getcategorybyid, getsellerlist, getuserlist } from "../controller/adminController.js";
import { protect } from "../middleware/protect.js";
import { getAllbooks } from "../controller/userController.js";
import { upload } from "../middleware/upload.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin working ✔️");
});
router.get("/userlist",protect,getuserlist)
router.delete("/userdelete/:id",protect,deletuser)
router.get("/sellerlist",protect,getsellerlist)
router.get("/categories",protect,getcategories)
router.post("/addcategory",protect,addcategory)
router.get("/books",protect,getAllbooks)
router.put("/getcategorybyid/:id",protect,getcategorybyid)
router.post("/addbanner",protect,upload.fields([
  { name: "banner1", maxCount: 1 },
  { name: "banner2", maxCount: 1 },
  { name: "banner3", maxCount: 1 },
]),addbanner)

export default router;
