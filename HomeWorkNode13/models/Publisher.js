//Задание 1

import mongoose from "mongoose";

const publisherSchema=new mongoose.Schema(
    {
         name: { type: String, required: true, trim: true },
         location: { type: String, default: "", trim: true }
    },
    { timestamps: true }
);

publisherSchema.virtual('magazines', {
    ref: "Magazine",
    localField: "_id",
    foreignField: "publisher"
});

publisherSchema.set("toJSON", { virtuals: true });
publisherSchema.set("toObject", { virtuals: true });

const Publisher = mongoose.model("Publisher", publisherSchema);
export default Publisher;