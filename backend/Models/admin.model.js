import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
     // required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },

    post: {
      type: String,
     // required: [true, "Post is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"],
    },

    address: {
      type: String,
     // required: [true, "Address is required"],
    },

    country: {
      type: String,
     // required: [true, "Country is required"],
    },

    jobExperience: {
      type: String,
      //required: [true, "Job experience is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    /* ✅ Image Object (Cloudinary / Multer Compatible) */
    image: {
      public_id: {
        type: String,
        default: "",
      },
      secure_url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;