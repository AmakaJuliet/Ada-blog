const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user",
       required: true,
    },
    title: {
       type: String,
       required: true,
    },
    status: {
       type: String,
       enum: ["DRAFT", "PUBLISHED"],
       required: true,
       default: "DRAFT",
    },
    content: {
      type: String,
      required: true,
    },
    published_at: {
       type: Date,
       required: false,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    }
});

const articleModel = mongoose.model("article", ArticleSchema);

module.exports = articleModel;