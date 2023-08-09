import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  seller: {
    required:[true, "seller userId is required"],
    unique:[true, "The seller userdetails already exists"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
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
      values: ['painting', 'photography', 'sculpture'],
      message: 'Category must be painting, photography or sculpture'
    }
  },
  photo: {
    type: String,
    required: [true, "Photo is required."]
  },
  likes: {
    count: {
      type: Number,
      min: [0, "Like count can't be negative"],
    },
    users: {
      type: Array,
    }

  }


});


const Products = mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;