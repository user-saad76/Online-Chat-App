import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
      match: [/^\S+@\S+\.\S+$/, "Please use valid email"],
    },

    jobPost: {
      type: String,
      required: [true, "Job post is required"],
      trim: true,
    },

    jobExperience: {
      type: String,
      required: [true, "Job experience is required"],
      enum: ["Fresher", "1 Year", "2-3 Years", "5+ Years"],
    },

    bio: {
      type: String,
      required: [true, "Bio is required"],
      minlength: [10, "Bio must be at least 10 characters"],
    },

    image: {
      type: String, // Cloudinary URL or file path
      required: [true, "Profile image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;