import dbConnect from "../../../../services/dbConnect.service";
import Products from "@/models/users/products";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

// GET a specific product by id
export const GET = async (req, res) => {
  try {
    const query = req.url.split("/");
    const productId = query[query.length - 1];

    await dbConnect();
    const product = await Products.findById(productId).populate({
      path: "artist",
      populate: {
        path: "user",
      },
    });

    return new NextResponse(JSON.stringify(product));
  } catch (error) {
    console.log("ERROR while getting single product" + error);
    return new NextResponse(JSON.stringify({ error: "error occured" }));
  }
};

// PATCH a specific product by id
export const PATCH = async (req) => {
  try {
    // checking for usersession as returned from header cookies from client req
    const token = await getToken({ req: req });
    if (!token?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in to perform edit." },
        { status: 401 },
      );
    }

    const { artist, name, price, description, category, photo } =
      await req.json();

    const query = req.url.split("/");

    const productId = query[query.length - 1];

    const updatedData = { artist, name, price, description, category, photo };

    await dbConnect();
    const existingProduct =
      await Products.findById(productId).populate("artist");

    if (existingProduct.artist.user != token.user.id) {
      return NextResponse.json(
        { message: "You can't edit this product!" },
        { status: 401 },
      );
    }

    const newProduct = await Products.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true },
    ).populate("artist");

    return new NextResponse(JSON.stringify(newProduct));
  } catch (error) {
    console.log("ERROR while getting single product" + error);
    return new NextResponse(JSON.stringify({ error: "error occured" }));
  }
};

// DELETE a specific product by id
export const DELETE = async (req, res) => {
  try {
    // checking for usersession as returned from header cookies from client req
    const token = await getToken({ req: req });
    if (!token?.user.id) {
      return NextResponse.json(
        { message: "You must be logged in to perform delete." },
        { status: 401 },
      );
    }

    const query = req.url.split("/");
    const productId = query[query.length - 1];
    await dbConnect();

    const existingProduct =
      await Products.findById(productId).populate("artist");
    if (existingProduct.artist.user != token.user.id) {
      return NextResponse.json(
        { message: "You can't delete this product!" },
        { status: 401 },
      );
    }

    const product = await Products.findByIdAndDelete(productId);

    if (product) {
      return new NextResponse(
        JSON.stringify({ ...product, message: "delete success" }),
        { status: 200 },
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "product doesn't exist" }),
        { status: 400 },
      );
    }
  } catch (error) {
    console.log("ERROR while deliting single product");
    throw error;
  }
};
