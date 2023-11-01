
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
  
      // Get product
      const product = await Products.findById(productId); 
  
      // Check if user already liked
      const userHasLiked = product.likes.includes(userId);
  
      // Update likes array
      let updatedLikes = [...product.likes];
      console.log(updatedLikes)
      if (userHasLiked) {
        console.log("true................")
        updatedLikes = updatedLikes.filter(id => !id.equals(userId));
    } else {
          console.log("false................")
        updatedLikes.push(userId); 
      }
  
      // Rest of updated data
      const updatedData = {
        likes: updatedLikes,
        // Other fields like name, description etc
      };
      console.log(updatedData)
  
      // Update product with new data
      await Products.findByIdAndUpdate(productId, updatedData);
  
      return new NextResponse(JSON.stringify(updatedData));
  
    } catch (error) {
      console.log("Error updating likes: " + error);
      return new NextResponse(JSON.stringify({error: "Error updating likes"}))
    }
  
  }