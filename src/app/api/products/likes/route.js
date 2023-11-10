
import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { getToken } from "next-auth/jwt";
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
    const token = await getToken({ req: request })
    if (!token?.user.id) {
      return NextResponse.json({message: "You must be logged in to interact!"}, {status:401 })
    }

    const { productId, userId } = await request.json();
    let status = false;
    let count = 0

    if (!userId || !productId) {
      return new NextResponse(JSON.stringify({ error: "Bad Request" }), { status: 400 });
    }

    // Get product
    const product = await Products.findById(productId);
    const userdetails = await UsersDetails.findById(userId);
    console.log(product, userdetails)

    // Check if userdetails already liked
    const userHasLiked = product.likes.includes(userId);
    const productIsLiked = userdetails.likeProducts.includes(productId);

    let updatedLikes = [...product.likes];
    let updatedLikesUser = [...userdetails.likeProducts];

    // Update likes array for users
    if (productIsLiked) {
      updatedLikesUser = updatedLikesUser.filter(id => !id.equals(productId));
    }
    else {
      updatedLikesUser.push(productId);
    }

    // Update likes array for products

    if (userHasLiked) { // already liked remove userid form likes array
      updatedLikes = updatedLikes.filter(id => !id.equals(userId));
      status = "unliked"
    } else { // not liked add userid in likes array
      updatedLikes.push(userId);
      status = "liked"
    }

    // Update the database

    // now update add the updated likes data to db
    product.likes = updatedLikes;
    userdetails.likeProducts = updatedLikesUser;
    const updatedProduct = await product.save();
    await userdetails.save();

    // Update product with new data
    return new NextResponse(JSON.stringify(updatedProduct));

  } catch (error) {
    console.log("Error occured while updating likes: ");
    throw error;
    // return new NextResponse(JSON.stringify({ error: "Error updating likes" }))
  }

}