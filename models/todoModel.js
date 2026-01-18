const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      default: null,
    },

    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      ref: "User",
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todoModel", todoSchema);

module.exports = todoModel;