import dbConnect from "@/lib/dbConnect";
import { pageSize as documentPerPage } from "@/lib/utils";
import Products from "@/models/useraccounts/products";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";


// GET => get all products
export const GET = async (req) => {
    try {
        const pageSize = documentPerPage; // Represents the number of document for a page
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
                    sortQuery = { likesCount: 1 }
                    break;
                case 'likesD':
                    sortQuery = { likesCount: -1 }
                    break;
                case 'newA':
                    sortQuery = { createdAt: 1 }
                    break;
                case 'newD':
                    sortQuery = { createdAt: -1 }
                    break;
                default:
                    break;
            }
        }
        // console.log(sortQuery)

        const db = await dbConnect();
        const populateOpts = {
            path: 'artist',
            populate: {
                path: 'user'
            }
        }

        if (username) {
            populateOpts.populate.match = { username }
        }

        const totalProducts = await Products.countDocuments();
        const totalPages = Math.ceil(totalProducts / pageSize);

        

        let res;
        if (sort?.includes("likes")) {
            res = await Products.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        likesCount: { $size: '$likes' },
                    },
                },
                {
                    $lookup: {
                        from: 'usersdetails',
                        localField: 'artist',
                        foreignField: '_id',
                        as: 'artist',
                    },
                },
                {
                    $unwind: '$artist',
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'artist.user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $sort: sortQuery,
                },
                {
                    $addFields: {
                        'artist.user': '$user', // Assign the same name as the field to the populated field inside 'artist'
                    },
                },
                {
                    $project: {
                        user: 0, // Exclude redundant field
                    },
                },
                {
                    $project: {
                        likesCount: 0, // Remove the likesCount field if you don't want it in the final result
                    },
                },
                {
                    $skip: (page - 1) * pageSize,
                },
                {
                    $limit: pageSize,
                },
            ])
        } else {
            res = await Products.find(query)
                .sort(sortQuery)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .populate(populateOpts)
        }
        // return those product only whose artsit and artist.user exists
        const filtered = res.filter(p => (p.artist && p.artist.user))

        const finalData = {
            totalPages: totalPages,
            pageSize: pageSize,
            page: +page,
            documentSize: filtered.length,
            data: filtered,
        }

        return  NextResponse.json(finalData)

    } catch (error) {
        console.log("ERROR fetching products \n" + error)
    }
}


// POST => POST a product
export const POST = async (request) => {

    try {
        const token = await getToken({ req: request })
        if (!token?.user.id) {
            return NextResponse.json({ message: "You must be logged in to upload!" }, { status: 401 })
        }



        const { artist, name, price = 0, description = "", category, photo, height, width, notForSale } = await request.json();
        const hasSize = height && width;

        if (!token?.user.isArtist) {
            return NextResponse.json({ message: "You aren't registered as artist!" }, { status: 400 })
        }



        if (!artist || !name || !category || !photo || (!notForSale && !price)) {
            return NextResponse.json({ message: "Some required fields are missing!" }, { status: 403 })
        }
        if ((height && !width) || (!height && width)) {
            return NextResponse.json({ message: "Enter both height and width or skip both!" }, { status: 403 })
        }


        await dbConnect("user");
        const userDetails = await UsersDetails.findById(artist).populate("user")

        if (token.user.id != userDetails?.user._id) {
            return NextResponse.json({ message: "You can't post as other artist." }, { status: 401 })
        }

        const newProduct = new Products({ artist, name, price, description, category, photo, notForSale, });
        (height && width) && (newProduct.size = `${width}x${height}`);
        const savedProduct = await newProduct.save();

        await UsersDetails.findByIdAndUpdate(artist, { $push: { artWorks: savedProduct._id } });

        return new NextResponse(JSON.stringify(savedProduct))
    } catch (error) {
        console.log("ERROR while creating product \n")
        throw error;
    }

}