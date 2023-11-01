import dbConnect from "@/lib/dbConnect";
import Users from "@/models/useraccounts/users";
import UsersDetails from "@/models/useraccounts/usersDetail";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcrypt"



// // GET => get all users (NOT APPLICABLE)
// export const GET = async () => {
//   try {
//     await dbConnect();

//     const data = await UsersDetails.find({})
//       .populate({
//         path: 'user',
//         select: '-password' // excludes password
//       })
//     const res = data.filter(doc => doc.user.isSeller);
//     return new NextResponse(JSON.stringify(res))

//   } catch (error) {
//     console.log("ERROR fetching products \n" + error)
//   }
// }








// POST => POST a user

export const POST = async (request) => {
  const saltRounds = 10;
  const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
      })
    })
  }



  try {
    const { username, email, password, phone, displayName } = await request.json();

    if (!username || !email || !password) {
      return new NextResponse(JSON.stringify({ field: "multiple", message: "Missing some required fields." }), { status: 403, statusText: "validation_error" })
    }


    await dbConnect();

    console.log("email", email)



    // validation part
    const existingEmail = await Users.findOne({ email });
    if (existingEmail?._id && existingEmail?.password) {
      return new NextResponse(JSON.stringify({ field: "email", message: "Email is already registered." }), { status: 403, statusText: "validation_error" })
    }

    if (existingEmail?._id && !existingEmail?.password) {
      // There is user with email but password or username is not set
      //(probably sign in with google is done)

      // updates data in user collection, adds userdetails, removes schema unset fields in user collection
      const updatedUser = {
        email: existingEmail.email,
        username,
        password: await hashPassword(password),
        $unset: { field: ["name", "image"] }
      }

      const userData = {
        displayName: existingEmail.name,
        photo: existingEmail.image,
      }
      console.log("existingEmail", existingEmail)

      const testuser = await Users.findOne({ email });
      console.log("TEST USER", testuser)

      const doc = await Users.findOneAndUpdate(
        { email: existingEmail.email },
        { ...updatedUser},
        { new: true });
      console.log("DOC", doc)
      // const savedData = await doc.save();

      const userDetails =  new UsersDetails({ ...userData, user: doc._id })

      const populatedUserDetails = await userDetails.populate({ path: "user", select: "-password" })

      return new NextResponse(JSON.stringify(populatedUserDetails))
    }






    const existingUsername = await Users.findOne({ username });
    if (existingUsername?._id) return new NextResponse(JSON.stringify({ field: "username", message: "Username already taken. Please choose another." }), { status: 403, statusText: "validation_error" })

    if (phone) {
      const existingPhone = await Users.findOne({ phone });
      if (existingPhone?._id) return new NextResponse(JSON.stringify({ field: "phone", message: "Phone number is already registered." }), { status: 403, statusText: "validation_error" })
    }


    // saving new user
    const newUser = new Users({ username, email, password: await hashPassword(password) });
    phone && (newUser.phone = phone);
    const savedUser = await newUser.save();


    //saving userdetails of new user if the new user is created
    if (savedUser?._id) {
      const newUserDetail = new UsersDetails({ user: newUser._id });
      phone && (newUserDetail.phone = phone);
      displayName && (newUserDetail.displayName = displayName);

      const savedUserDetail = await newUserDetail.save();

      const data = await savedUserDetail.populate('user', { username: 1, email: 1, _id: 1, phone: 1, });

      return new NextResponse(JSON.stringify(data))
    }


  } catch (error) {
    console.log("ERROR while creating user \n" + error)
  }

}



// PATCH => Update an existing user

export const PATCH = async (request) => {

  try {
    const { id, updatedData, } = await request.json();

    await dbConnect();


    const updatedUser = await Users.findByIdAndUpdate(id, { ...updatedData, }, {
      new: true
    });


    return new NextResponse(JSON.stringify(updatedUser))

  } catch (error) {
    console.log("ERROR while updating user \n" + error);
  }
}


// DELETE => Delete a user

export const DELETE = async (request) => {

  try {
    const { id } = await request.json();

    await dbConnect();


    await Users.findByIdAndDelete(id);



    return new NextResponse(JSON.stringify({ message: "User deleted successfully" }));

  } catch (error) {
    console.log("ERROR while deleting user \n" + error);
  }
}