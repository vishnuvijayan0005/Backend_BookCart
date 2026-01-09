import {
    dbaddbanner,
    dbaddcategory,
  dbgetcategory,
  dbgetcategorybyid,
  dbgetsellerlist,
  dbgetuserlist,
  dbuserdelete,
} from "../helpers/adminHelper.js";
import { uploadToCloudinary } from "../middleware/upload.js";

export const getuserlist = async (req, res) => {
  const result = await dbgetuserlist();
  return res.status(200).json(result);
};

export const deletuser = async (req, res) => {
  const userID = req.params.id;
  // console.log(userID,"-------><><>");

  const result = await dbuserdelete(userID);
  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(401).json(result);
  }
};
export const getsellerlist = async (req, res) => {
  const result = await dbgetsellerlist();
  return res.status(200).json(result);
};

export const getcategories = async (req, res) => {
  try {

    const result = await dbgetcategory();
    // console.log(result);
    
    if (result.success) {
      return res.status(200).json(result);
    } else {
     return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};
export const addcategory = async (req, res) => {
  try {
    const { categoryname } = req.body;

    if (!categoryname || categoryname.trim() === "") {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const result = await dbaddcategory(categoryname);

    if (result.success) {
      return res.status(200).json(result); // return to stop execution
    } else {
      return res.status(400).json(result); // correct usage
    }

  } catch (error) {
    console.error("Error in addcategory:", error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};
export const getcategorybyid=async(req,res)=>{
   try {
     const categoryID=req.params.id
    const {categoryname}=req.body
    const results=await dbgetcategorybyid(categoryID,categoryname);
    
    if(results.success){
        return res.status(200).json(results)
    }
    else{
        return res.status(401).json(results)
    }
   } catch (error) {
    console.log(error);
    
   }
}

export const addbanner=async(req,res)=>{
       const files = req.files; // <-- NOTE: files, not file
    const banners = {};

    if (files.banner1) {
      const result1 = await uploadToCloudinary(files.banner1[0].buffer, "banner1");
      banners.banner1 = result1.secure_url;
    }

    if (files.banner2) {
      const result2 = await uploadToCloudinary(files.banner2[0].buffer, "banner2");
      banners.banner2 = result2.secure_url;
    }

    if (files.banner3) {
      const result3 = await uploadToCloudinary(files.banner3[0].buffer, "banner3");
      banners.banner3 = result3.secure_url;
    }
   
    
        const saveDB=await dbaddbanner(banners)
        if (saveDB.success){
            return res.status(200).json(saveDB)
        }
        else{
            return res.status(200).json(saveDB)
        }
}