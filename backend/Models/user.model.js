import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
      match: [/^03\d{9}$/, "Phone format: 03XXXXXXXXX"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // store image path / filename from multer
   image: {
        public_id: String,
         secure_url: String
      }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
