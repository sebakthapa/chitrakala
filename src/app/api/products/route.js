import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";


// GET => get all products
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username');
        const sort = searchParams.get('sort');
        const category = searchParams.get('category');
        const page = searchParams.get('page') || 1;
        let query = {}
        let sortQuery = {}
        if (category) {
            query.category = category
        }
        if (sort) {
            switch (sort) {
                case 'priceA':
                    sortQuery = { price: 1 };
                    break;
                case 'priceD':
                    sortQuery = { price: -1 };
                    break;
                case 'likesA':
                    sortQuery = { likes: 1 }
                    break;
                case 'likesD':
                    sortQuery = { likes: -1 }
                    break;
                case 'newA':
                    sortQuery = { createdAt: 1 }
                    break;
                case 'newD':
                    sortQuery = { updatedAt: -1 }
                    break;
                default:
                    break;
            }
        }
        console.log(sortQuery)

        await dbConnect();
        const populateOpts = {
            path: 'artist',
            populate: {
                path: 'user'
            }
        }

        if (username) {
            populateOpts.populate.match = { username }
        }

        const res = await Products.find(query)
            .skip((page-1) * 12)
            .limit(12)
            .sort(sortQuery)
            .populate(populateOpts)
        
        const filtered = res.filter(p => p.artist && p.artist.user)

        return new NextResponse(JSON.stringify(filtered))
    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}


// POST => POST a product
export const POST = async (request) => {

    try {
        const token = await getToken({ req: request })
        if (!token?.user.id) {
            return NextResponse.json({message: "You must be logged in to upload!"}, { status: 401 })
        }

        
        
        const { artist, name, price, description = "", category, photo, } = await request.json();

        if (!token?.user.isArtist) {
            return NextResponse.json({message:"You aren't registered as artist!"}, { status: 400 })
        }
        
        
        await dbConnect("user");
        const userDetails = await UsersDetails.findById(artist).populate("user")

        if (token.user.id != userDetails?.user._id) {
            return NextResponse.json({message: "You can't post as other artist."}, { status: 401 })
        }

        const newProduct = new Products({ artist, name, price, description, category, photo, });
        const savedProduct = await newProduct.save();

        await UsersDetails.findByIdAndUpdate(artist, { $push: { artWorks: savedProduct._id } });

        return new NextResponse(JSON.stringify(savedProduct))
    } catch (error) {
        console.log("ERROR while creating product \n")
        throw error;
    }

}