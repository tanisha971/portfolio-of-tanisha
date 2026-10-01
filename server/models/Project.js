import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    details: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      required: true,
    },

    github: {
      type: String,
      default: "",
    },

    live: {
      type: String,
      default: "",
    },

    tech: [
      {
        type: String,
      },
    ],

    category: {
      type: [String],
      default: [],
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },

    featured: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);