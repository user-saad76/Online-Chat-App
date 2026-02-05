import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true,
    },


    post: {
      type: String,
      minlength: [2, "Post must be at least 2 characters"],
    },

    address: {
      type: String,
      minlength: [5, "Address must be at least 5 characters"],
    },

    city: {
      type: String,
      minlength: [2, "City must be at least 2 characters"],
    },

    phone: {
      type: String,
      unique: true,
      match: [/^03\d{9}$/, "Phone format: 03XXXXXXXXX"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // hides password in queries
    },

    image: {
       public_id: String,
          secure_url: String
      }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);




 