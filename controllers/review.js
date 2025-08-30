const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


// module.exports.createReview=async(req,res) =>{
//  let listing =await Listing.findById(req.params.id);
//  let newReview = new Review(req.body.review);
//  newReview.author = req.user._id;
//  listing.reviews.push(newReview);

//  await newReview.save();
//  await listing.save();

// req.flash("success","New Review Created!");
// res.redirect(`/listings/${listing._id}`);
// };


module.exports.createReview = async (req, res) => {
  console.log("🚀 HIT createReview");
  console.log("✅ Review Body:", req.body);
  console.log("🧠 Listing ID:", req.params.id);

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    console.log("❌ Listing not found");
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);

  await review.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};



module.exports.deleteReview = async(req,res) =>{
    let { id, reviewId } =req.params;
  
    await Listing.findByIdAndUpdate( id,{$pull:{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId); // ✅ Correct
  
          req.flash("error","Your Review is Deleted!");
          res.redirect(`/listings/${id}`);
      };