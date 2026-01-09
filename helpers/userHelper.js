import Banner from "../model/Banner.js";
import Book from "../model/Book.js";
import Cart from "../model/CartSchema.js";

// ------------get all product-------------

export const getuserall = async (userID) => {
  try {
    
    const books = await Book.find({ isDeleted: false }).lean();

    const userCart = await Cart.findOne({ userID }).lean();

    const wishlistIds = new Set(
      (userCart?.wishList || [])
        .filter(item => item.onDelete === false)
        .map(item => item.bookID.toString())
    );

    const result = books.map(book => ({
      ...book,
      inwish: wishlistIds.has(book._id.toString()),
    }));

    return {
      success: true,
      message: "Books fetched with wishlist status",
      data: result,
    };
  } catch (error) {
    console.error("Product fetch failed:", error);
    return {
      success: false,
      message: "Failed to fetch products",
      data: [],
    };
  }
};
export const getall = async () => {
  try {

    const books = await Book.find({ isDeleted: false });

    return {
      success: true,
      message: "successfully fetched",
      data: books,
    };
  } catch (error) {
    console.error(" Product fetch failed:", error.message);
    return {
      success: false,
      message: "Failed to fetch products",
    };
  }
};


export const getbyId = async (bookId) => {
  const onebook = await Book.findById(bookId);
  if (onebook) {
    return {
      message: "book found",
      success: true,
      data: onebook,
    };
  } else {
    return {
      message: "book not found",
      success: false,
    };
  }
};

export const dbToggleWishBook = async (userID, bookID) => {
  try {
    let userCart = await Cart.findOne({ userID });

    if (!userCart) {
      userCart = new Cart({
        userID,
        wishList: [{ bookID, onDelete: false }],
        cart: [],
      });
      await userCart.save();
      return { success: true, inWishlist: true };
    }

    let wishItem = userCart.wishList.find(
      (item) => item.bookID.toString() === bookID
    );

    let inWishlist = true;

    if (wishItem) {
      wishItem.onDelete = !wishItem.onDelete;
      inWishlist = !wishItem.onDelete;
    } else {
      userCart.wishList.push({ bookID, onDelete: false });
      inWishlist = true;
    }

    await userCart.save();

    return { success: true, inWishlist };
  } catch (error) {
    console.error(error);
    return { success: false, inWishlist: false, message: "DB error" };
  }
};





//   try {
//     let userCart = await Cart.findOne({ userID });

//     if (!userCart || !userCart.wishList) {
//       return { success: false, message: "Wishlist not found" };
//     }

//     // Soft delete: set onDelete = true for the matching book
//     const item = userCart.wishList.find(
//       (item) => item.bookID.toString() === bookID
//     );

//     if (!item) {
//       return { success: false, message: "Book not in wishlist" };
//     }

//     item.onDelete = true;

//     await userCart.save();

//     return { success: true, message: "Book removed from wishlist (soft delete)" };
//   } catch (error) {
//     console.error("dbremovewishbook error:", error);
//     return { success: false, message: error.message || "Failed to remove book" };
//   }
// };

export const dbgetwishbook = async (userID) => {
 try {
    
    const books = await Book.find({ isDeleted: false }).lean();

    const userCart = await Cart.findOne({ userID }).lean();

    const wishlistIds = new Set(
      (userCart?.wishList || [])
        .filter(item => item.onDelete === false)
        .map(item => item.bookID.toString())
    );

   const result = books
  .map(book => ({
    ...book,
    inwish: wishlistIds.has(book._id.toString()),
  }))
  // Keep only books that are in wishlist
  .filter(book => book.inwish);

  
    return {
      success: true,
      message: "Books fetched with wishlist status",
      data: result,
    };
  } catch (error) {
    console.error("Product fetch failed:", error);
    return {
      success: false,
      message: "Failed to fetch products",
      data: [],
    };
  }
};



export const dbgetbanner=async()=>{
  const res=await Banner.find()
  if(!res){
    return{
      success:false,
      message:"banner not found"
    }
    
  }
  else{
    return{
      success:true,
      data:res,
      message:"banner found"
    }
  }
}