import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },

    cnic: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{5}-\d{7}-\d$/, "CNIC format: 12345-1234567-1"],
    },

    post: {
      type: String,
      required: true,
      minlength: 2,
    },

    address: {
      type: String,
      required: true,
      minlength: 5,
    },

    city: {
      type: String,
      required: true,
      minlength: 2,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
     
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password by default
    },

    image: {
      type: String, // store filename or Cloudinary URL
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
