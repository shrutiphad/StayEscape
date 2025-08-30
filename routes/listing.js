const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner,validateListing}= require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//INDEX AND CREATE
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
     upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.createListing));

// .post( upload.single('listingimage'), function (req, res, next) {
//     res.send(req.file);
// });

//NEW Route
router.get("/new",
    isLoggedIn,
    wrapAsync(listingController.renderNewForm ));


// SHOW UPDATE DELETE
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync( listingController.updateListing))
.delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));


//EDIT ROUTE
router.get(
    "/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));
    
module.exports = router;