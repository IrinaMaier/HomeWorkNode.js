//Задание 2

import mongoose from "mongoose";

const { Schema } = mongoose;

const magazineSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    issueNumber: { type: Number, required: true, min: 1 },
   
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
      required: true
    }
  },
  { timestamps: true }
);

const Magazine = mongoose.model("Magazine", magazineSchema);
export default Magazine;