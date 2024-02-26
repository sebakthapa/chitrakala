import dbConnect from "../../../services/dbConnect.service";
import UsersDetails from "@/models/users/usersDetail";
import { NextResponse } from "next/server";

// GET => get userData's wishLists
export const GET = async (req) => {
  try {
    await dbConnect();
    const query = req.url.split("?")[1];
    const searchParams = new URLSearchParams(query);
    const queryObj = {};
    for (const [key, value] of searchParams.entries()) {
      queryObj[key] = value;
    }

    const userId = queryObj.userId;

    const userData = await UsersDetails.findOne({ user: userId }).populate(
      "wishLists",
    );

    if (userData && userData.wishLists) {
      return new NextResponse(JSON.stringify(userData.wishLists));
    }

    return new NextResponse(JSON.stringify({ error: "No wishLists to load" }), {
      status: 400,
    });
  } catch (error) {
    console.log("ERROR fetching wishLists\n" + error);
  }
};

// POST => add item to userData's wishLists
export const POST = async (request) => {
  try {
    const { user, productId } = await request.json();
    await dbConnect();

    // Find the userData by user
    const userData = await UsersDetails.findOne({ user });
    console.log("user, productID", user, productId);
    console.log("userdata.whishlists", userData.wishLists);

    if (userData) {
      // Check if productId already exists in the wishLists to avoid duplicates
      if (!userData.wishLists.includes(productId)) {
        userData.wishLists.push(productId);
        const updatedUser = await userData.save();
        const newuserData = await UsersDetails.findOne({ user }).populate(
          "wishLists",
        );
        return new NextResponse(JSON.stringify(newuserData.wishLists));
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Item already in wishLists" }),
          { status: 400 },
        );
      }
    } else {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log("ERROR adding item to wishLists\n" + error);
  }
};

// DELETE => remove item from userData's wishLists
export const DELETE = async (request) => {
  try {
    const { user, productId } = await request.json();
    await dbConnect();

    // Find the userData by user
    const userData = await UsersDetails.findOne({ user });

    if (userData) {
      // Check if the item exists in the wishLists
      const itemIndex = userData.wishLists.indexOf(productId);

      if (itemIndex !== -1) {
        // Remove the item from the wishLists array
        userData.wishLists.splice(itemIndex, 1);
        const updatedUser = await userData.save();
        return new NextResponse(JSON.stringify(updatedUser.wishLists));
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Item not found in wishLists" }),
          { status: 400 },
        );
      }
    } else {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log("ERROR removing item from wishLists\n" + error);
  }
};
