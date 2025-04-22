const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
    required: true,
    },
    description: String,
    image: {
        type:String,
        default:
            "https://images.unsplash.com/photo-1692133216537-b4584e14fb7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlzdGluZ3xlbnwwfHwwfHx8MA%3D%3D",
        set:(v)=>v === "" ? "https://images.unsplash.com/photo-1692133216537-b4584e14fb7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGlzdGluZ3xlbnwwfHwwfHx8MA%3D%3D":v,
    },
    price: Number,
    location: String,
    country: String,

});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;
