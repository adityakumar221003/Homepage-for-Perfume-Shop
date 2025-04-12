
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    username: String,
    comment: String,
    rating: Number,
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
