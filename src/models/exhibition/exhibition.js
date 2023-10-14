import mongoose from "mongoose";

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 500 characters']
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },

  datetime: {
    type: Date,
    required: [true, 'Datetime is required']
  },
  photo: {
    type: String,
    required: [true, 'Photo is required']
  }
},{timestamps:true});
mongoose.models = {}

const Exhibition =  mongoose.model("Exhibition", exhibitionSchema);

export default Exhibition;
