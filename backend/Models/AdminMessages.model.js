import mongoose from "mongoose";

const AdminMessageSchema = new mongoose.Schema(
  {
     message: {
      type: String,
      required: true
    },    // ✅ ADD THIS FIELD
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // ⚠️ your admin model name
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdminMessage",  AdminMessageSchema );