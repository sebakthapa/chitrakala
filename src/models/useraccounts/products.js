import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  artist: {
    required:[true, "artist userId is required"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersDetails",
    sparse: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than zero']
  },

  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 500 characters']
  },

  category: {
    type: String,
    required: true,
    enum: {
      values: ['oil', 'water', 'digital','sketch','other'],
      message: 'Category must be painting, photography or sculpture'
    }
  },
  photo: {
    type: String,
    required: [true, "Photo is required."]
  },
  likes: {
      type: [mongoose.Schema.Types.ObjectId],

  }


},{timestamps:true});

mongoose.models = {}

const Products = mongoose.model("Products", productsSchema);

export default Products;