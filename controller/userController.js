import {  cartadd, dbgetbanner, dbgetwishbook, dbToggleWishBook, deletecartproduct, getall, getbyId, getcartItem, getuserall } from "../helpers/userHelper.js";

export const getAllbooks = async (req, res) => {
  const result = await getall();
  console.log(result);
  
  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(401).json(result);
  }
};
export const getuserAllbooks = async (req, res) => {
  const userID=req.user.id
  const result = await getuserall(userID);
  // console.log(result);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
};

export const getbookbyId = async (req, res) => {
  try {
    const bookID = req.params.id;
    const result = await getbyId(bookID);
    if (result.success) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};


export const wishbook = async (req, res) => {
  try {
    const userID = req.user.id;   // from auth middleware
    const bookID = req.params.id; // book id

    const result = await dbToggleWishBook(userID, bookID);

    if (!result?.success) {
      return res.status(400).json({
        success: false,
        message: result?.message || "Failed to update wishlist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist updated successfully",
      inWishlist: result.inWishlist,
    });

  } catch (error) {
    console.error("Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// export const removewishbook=async (req,res)=>{
// try {
//   const userID=req.user.id
//   const bookID=req.params.id
//   const result =dbremovewishbook(userID,bookID)
// } catch (error) {
  
// }

// }
export const getwishbooks=async(req,res)=>{
  const userID =req.user.id
 const wishbooks= await dbgetwishbook(userID)
 if (!wishbooks.success){
  return res.status(400).json(wishbooks)
 }
 return res.status(200).json(wishbooks)
 
}

export const getbanner=async(req,res)=>{
  const result=await dbgetbanner()
  if(result.success){
    res.status(200).json(result)
  }
  else{
    res.status(401).json(result)
  }
}


export const addcart =async(req,res)=>{
    const productid = req.params.id;
    const userid=req.user.id;
    
    
    const result = await cartadd(productid,userid)

    
    if(result.success){
        res.status(200).json(result)
    }
    else{
        res.status(500).json({message:"product already in cart"})
    }
    
}
export const getCartProduct =async(req,res)=>{

const userId=req.user.id;
const result =await getcartItem(userId)
if(result.success){
    res.status(200).json(result)
    
    
}
else(res.status(500).json({message:'no product found in the cart'}))
}
export const cartproductdelete=async(req,res)=>{
    const userId =req.user.id;
    const productId= req.params.id;
    const result =await deletecartproduct(productId,userId)
    if (!result.success) {
res.status(200).json(result)        
    }
    else
{
    res.status(200).json(result)        

}
}