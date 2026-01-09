import { uploadToCloudinary } from "../middleware/upload.js";
import {addbook, bookdeletion, bookupdate, dbgetcategorychart, sellerbooks} from "../helpers/sellerHelper.js"
export const addnewbook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      pages,
      publishedDate,
      quantity,
    } = req.body;
    const sellerID=req.user.id
    // console.log(sellerID);
    
    // Check file
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image required" });
    }

    // Upload to Cloudinary
    const cloud = await uploadToCloudinary(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`,
      "Books"   // folder name (auto created)
    );

    // Save to DB
    const result = await addbook({
      title,
      author,
      description,
      category,
      price,
      pages,
      publishedDate,
      quantity,
      image: cloud.secure_url,  
      public_id: cloud.public_id,
      sellerID 
    });

    return res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deletebook = async (req, res) => {
  try {
    const bookID = req.params.id;

    const result = await bookdeletion(bookID);

    if (result.success) {
      return res.status(200).json(result);
    }

    return res.status(404).json(result);

  } catch (error) {
    console.log("Delete Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updatebook = async (req, res) => {
  try {
    const bookID = req.params.id;
    const {
      title,
      author,
      category,
      description,
      price,
      pages,
      quantity,
      inStock,
      isWish,
      publishedDate,
    } = req.body;

    let imageUrl;

    // If a new image file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, Date.now().toString());
      imageUrl = result.secure_url;
    }

    const updateData = {
      title,
      author,
      category,
      description,
      price,
      pages,
      quantity,
      instock: inStock,
      inwish: isWish,
      publisheddate: publishedDate,
      ...(imageUrl && { image: imageUrl }), // only add if new image
    };

    const result = await bookupdate(bookID, updateData);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getsellerBooks =async(req,res)=>{
try {
    const sellerId =req.user.id
  const result =await sellerbooks(sellerId)
  if(result.success){
    res.status(200).json(result)
  }
  else
  {
    res.status(401).json(result)
  }
} catch (error) {
  console.log(error);
  
}

}

export const getcategorychart =async(req,res)=>{
  try {
    const result=await dbgetcategorychart()
    // console.log(result);
    return res.status(200).json(result)
  } catch (error) {
    console.log(error,'-------><>>>category<');
    
  }
}
