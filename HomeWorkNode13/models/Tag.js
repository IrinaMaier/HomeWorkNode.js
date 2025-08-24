//Задание 3

import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },

   
    articles: [
      { type: Schema.Types.ObjectId, ref: "Article", index: true }
    ],
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;