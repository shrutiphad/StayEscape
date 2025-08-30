const express = require("express");
//const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
//const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema,reviewSchema} =require("../schema.js");
// const Review = require("../models/review.js");
// const Listing = require("../models/listing.js");
const router = express.Router({ mergeParams: true }); 
const { validateReview, isLoggedIn, isReviewAuthor }= require("../middleware")


const reviewController = require("../controllers/review.js");

// const validateReview =(req,res,next) =>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400,errMsg)
//     }
//  else {
//     next();
// }
// };


//New REVIEW//
router.post("/" ,
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

// Delete REVIEW//
router.delete("/:reviewId",
       isLoggedIn,
       isReviewAuthor,
    wrapAsync(reviewController.deleteReview));


module.exports = router;