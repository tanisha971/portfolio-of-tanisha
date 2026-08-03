import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    tech: [
      {
        type: String,
      },
    ],

    certificate: {
      type: Boolean,
      default: false,
    },

    certificateUrl: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Experience", experienceSchema);