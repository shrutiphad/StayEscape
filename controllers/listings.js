const Listing = require("../models/listing");


module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};


module.exports.renderNewForm = async (req,res) =>{
    console.log(req.user);
    res.render("listings/new");
};


module.exports.showListing = (async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    //.populate("reviews")
     .populate({
    path: "reviews",
    populate: { path: "author" } // if you store author info
  })
    .populate("owner");
    if (!listing) {
        req.flash("error"," Listing you requested for does not exit!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show",{listing});
});


module.exports.createListing = async (req,res,next) => {
    /*  let result = listingSchema.validate(req.body);
     console.log(result);
     if(result.error){
        throw new ExpressError(400,result.error);
     }; */
   
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    console.log(req.file);

    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings"); 
    };


//     module.exports.createListing = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             req.flash("error", "Image upload failed. Please try again.");
//             return res.redirect("/listings/new");
//         }

//         const { path: url, filename } = req.file; // ✅ destructure safely
//         const newListing = new Listing(req.body.listing);

//         newListing.owner = req.user._id;
//         newListing.image = { url, filename };

//         await newListing.save();

//         req.flash("success", "New Listing Created!");
//         res.redirect("/listings");
//     } catch (err) {
//         next(err);
//     }
// };





    module.exports.renderEditForm =  (async(req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
     if (!listing) {
        req.flash("error"," Listing you requested for does not exit!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
});


    module.exports.updateListing = async (req,res,next) => {
    // if (!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing")
    // }
    let { id } = req.params;
    let listing =await Listing.findByIdAndUpdate( id,{...req.body.listing});
    
    // if(typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image ={ url, filename};
    await listing.save();
    //};

    req.flash("success","Listing is Updated!");
    res.redirect(`/listings/${listing._id}`);
};



 module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing is Deleted!");
  res.redirect("/listings");
};