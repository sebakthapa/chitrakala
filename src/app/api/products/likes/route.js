
import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import { NextResponse } from "next/server";

// GET => get all products
export const GET = async () => {
    try {
        await dbConnect();

        const res = await Products.find();
        return new NextResponse(JSON.stringify(res))

    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}



export const PATCH = async (request) => {

    try {
  
      const { productId, userId } = await request.json();
      let status= false;
      let count = 0
  
      // Get product
      const product = await Products.findById(productId); 
  
      // Check if user already liked
      const userHasLiked = product.likes.includes(userId);
  
      // Update likes array
      let updatedLikes = [...product.likes];
      if (userHasLiked) {
          updatedLikes = updatedLikes.filter(id => !id.equals(userId));
          status = "unliked"
    } else {
        updatedLikes.push(userId); 
        status = "liked"
      }
  
      // Rest of updated data
      const updatedData = {
        likes: updatedLikes,
        status,
        likesCount : updatedLikes.length

        // Other fields like name, description etc
      };
  
      // Update product with new data
      await Products.findByIdAndUpdate(productId, updatedData);
  
      return new NextResponse(JSON.stringify(updatedData));
  
    } catch (error) {
      console.log("Error updating likes: " + error);
      return new NextResponse(JSON.stringify({error: "Error updating likes"}))
    }
  
  }