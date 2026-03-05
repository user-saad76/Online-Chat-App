import mongoose from "mongoose";

const AdminMessageSchema = new mongoose.Schema(
  {
     message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdminMessage",  AdminMessageSchema );