const express= require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require('multer');
const{storage} = require("../cloudConfict.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))  //index Route
.post(isLoggedIn,upload.single('listing[image]'), validateListing,wrapAsync(listingController.createListing)); //Create Route

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //show route
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))  //Update Route
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));  //delete Route


//Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports=router;
