//Задание 3

import mongoose from "mongoose";

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title:   { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [
      { type: Schema.Types.ObjectId, ref: "Tag", index: true }
    ],
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;