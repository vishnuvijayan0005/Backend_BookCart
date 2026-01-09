import error from "mongoose/lib/error/index.js";
import Category from "../model/Category.js";
import User from "../model/userSchema.js";
import Banner from "../model/Banner.js";

export const dbgetuserlist = async () => {
  try {
    const userlist = await User.find({ userrole: "user", isDeleted: false });
    return {
      success: true,
      data: userlist,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const dbuserdelete = async (userID) => {
  try {
    // console.log(userID);

    const user = await User.findByIdAndUpdate(
      userID,
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return {
        success: false,
        message: "user not found",
      };
    }
    return {
      success: true,
      message: "user deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong",
    };
  }
};
export const dbgetsellerlist = async () => {
  try {
    const userlist = await User.find({ userrole: "seller", isDeleted: false });
    return {
      success: true,
      data: userlist,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
export const dbgetcategory = async () => {
  try {
    const categorylist = await Category.find({ isDeleted: false });
    // console.log(categorylist);
    return {
      success: true,
      message: "successfully fetched category",
      data: categorylist,
    };
  } catch (error) {
    return {
      success: false,
      message: "failed fecthing category",
    };
  }
};

export const dbaddcategory=async(name)=>{
try {
    if(!name||name.trim()==""){
        throw new error("Category name is required or can not be empty")
    }
    const existing=await Category.findOne({categoryName:name.trim()})
    if(existing){
        return{
            success:false,
            message:"already in CategoryList",
            data:existing
        }
    }
    const category=new Category({categoryName:name.trim()})
    await category.save()
    return{
        success:true,
        message:"Category Added"

    }
} catch (error) {
    console.log(error);
     return { success: false, message: error.message || "Something went wrong" };
    
}
}

export const dbgetcategorybyid=async(categoryID,newName)=>{
try{
const updatedCategory = await Category.findByIdAndUpdate(
      categoryID,
      { categoryName: newName },
      { new: true } 
    );

    if (!updatedCategory) {
      throw new Error("Category not found");
    }

    return {
        success:true,
        message:"updated successfully",
        data:updatedCategory

    };
  } catch (error) {
    console.error("Update category error:", error.message);
    throw error;
  }
};


export const dbaddbanner = async (bannerlist) => {
  try {
    const savedBanners = [];

console.log(bannerlist);
    for (const [name, url] of Object.entries(bannerlist)) {
      if (!url) continue; 

      const saved = await Banner.findOneAndUpdate(
        { name },
        { url },
        { upsert: true, new: true }
      );

      savedBanners.push(saved);
    }

    if (savedBanners.length === 0) {
      return { success: false, message: "No banners were added" };
    }

    return { success: true, message: "Banners added/updated", data: savedBanners };
  } catch (err) {
    console.error("Error saving banners:", err);
    return { success: false, message: "Error adding banners" };
  }
};