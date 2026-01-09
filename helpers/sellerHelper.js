import Book from "../model/Book.js";


export const addbook =async(bookData)=>{
    try {
         const newbook = await Book.create(bookData)
         return{
            success:true,
            message:"New Book added Successfully"
         }
    } catch (error) {
        return{
            success:false,
            message:"Book not added"
        }
        
    }
   

}
export const bookdeletion = async (id) => {
  try {
    const bookdeleted = await Book.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!bookdeleted) {
      return {
        success: false,
        message: "Book not found",
      };
    }

    return {
      success: true,
      message: "Book deleted successfully",
    };

  } catch (error) {
    console.log("Helper Error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const bookupdate = async (id, updateData) => {
  try {
    // Update the book by ID
    const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBook) {
      return { success: false, message: "Book not found" };
    }

    return { success: true, message: "Book updated successfully", book: updatedBook };
  } catch (error) {
    console.error("Error updating book:", error);
    return { success: false, message: "Something went wrong" };
  }
};

export const sellerbooks = async (sellerId) => {
  try {
    const bookitems = await Book.find({ sellerID: sellerId, isDeleted: false });

    if (bookitems && bookitems.length > 0) {
      return {
        success: true,
        message: "Books found",
        data: bookitems,
      };
    }

    return {
      success: false,
      message: "No books found",
      data: [],
    };

  } catch (error) {
    console.log("Helper Error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const dbgetcategorychart=async()=>{
  // services/bookService.js
  const result = await Book.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
  ]);
  // console.log(result);
  

  return {
    success: true,
    data: result,
  };


}