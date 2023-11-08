import dbConnect from "@/lib/dbConnect";
import Products from "@/models/useraccounts/products";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse,NextRequest } from "next/server";

import { useSearchParams } from "next/navigation";



// GET => get all products
export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username') ;
        const limit = searchParams.get('limit') ;
        const filter = searchParams.get('filter');
        const category = searchParams.get('category');
        let query = {}
        let sort = {}
        if (category) {
            query.category = category 
        }
        if (filter){
            switch (filter) {
                case 'priceA': 
                    sort = { price: 1 };
                    break;
                case 'priceD':
                    sort = { price : -1} ;
                    break;
                case 'likesA':
                    sort = {likes : 1}  
                    break;
                case 'likesD':
                    sort = {likes : -1}    
                    break;
                case 'newA':
                    sort = {createdAt : 1}  
                    break;
                case 'newD':
                    sort = {updatedAt : -1}    
                    break;
                default:
                    break;
            }
        }
        console.log(sort)
       
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
        .limit(limit) 
        .sort(sort)
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
        const { artist, name, price, description = "", category, photo, } = await request.json();
        // console.log(data);
        await dbConnect("user");

        const newProduct = new Products({ artist, name, price, description, category, photo, });

        const savedProduct = await newProduct.save();

        await UsersDetails.findByIdAndUpdate(artist, { $push: { artWorks: savedProduct._id } });


        return new NextResponse(JSON.stringify(savedProduct))

    } catch (error) {
        console.log("ERROR while creating product \n" + error)
    }

}