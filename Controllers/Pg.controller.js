const User = require("../Models/User");
const Property = require("./../Models/Properties");
const { uploadOnCloudinary } = require("../config/cloudinary");
// add pg
const AddPg = async (req, res) => {
  try {
    const {
      propertyName,
      location,
      status,
      tenetType,
      isFurnished,
      city,
      description,

      common_amenities = [],

      single_rent,
      single_total_rooms = 0,
      single_vacant_rooms = 0,
      single_room_security = 0,
      single_amenities = [],

      double_rent,
      double_total_rooms = 0,
      double_vacant_rooms = 0,
      double_room_security = 0,
      double_amenities = [],

      triple_rent,
      triple_total_rooms = 0,
      triple_vacant_rooms = 0,
      triple_room_security = 0,
      triple_amenities = [],
    } = req.body;

    const owner_id = req.user._id;

    // Duplicate property check
    const pre_property = await Property.findOne({
      propertyName: propertyName.trim(),
      location: location.trim(),
      status,
      description: description.trim(),
      owner: owner_id,
    });

    if (pre_property) {
      return res.status(400).json({
        message: "This property already exists for this owner.",
      });
    }

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadOnCloudinary(file.path)
      );

      const results = await Promise.all(uploadPromises);

      //sirf secure_url nikalna
      imageUrls = results
        .filter((res) => res?.secure_url)
        .map((res) => res.secure_url);
    }

    // New property create
    const newProperty = new Property({
      propertyName,
      location,
      status,
      tenetType,
      isFurnished,
      city,
      description,
      owner: owner_id,
      images: imageUrls,

      common_amenities,

      single_rent,
      single_total_rooms,
      single_vacant_rooms,
      single_room_security,
      single_amenities,

      double_rent,
      double_total_rooms,
      double_vacant_rooms,
      double_room_security,
      double_amenities,

      triple_rent,
      triple_total_rooms,
      triple_vacant_rooms,
      triple_room_security,
      triple_amenities,
    });

    const savedProperty = await newProperty.save();

    // Property id owner ke `properties` array me daalo
    await User.findByIdAndUpdate(owner_id, {
      $push: { properties: savedProperty._id },
    });

    return res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (err) {
    console.error("AddPg Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const AddPg = async (req, res) => {
//   try {
//     // const {

//     //   propertyName,
//     //   location,
//     //   status,
//     //   rent,
//     //   co_ed,
//     //   totalRooms,
//     //   Ac_rooms,
//     //   isFurnished,
//     //   description,
//     //   typesOfRoom,
//     //   city,
//     // } = req.body;

//     const {
//       propertyName,
//       location,
//       status,
//       tenetType,
//       isFurnished,
//       city,
//       description,

//       common_amenities,

//       single_rent,
//       single_total_rooms,
//       single_vacant_rooms,
//       single_room_security,
//       single_amenities,

//       double_rent,
//       double_total_rooms,
//       double_vacant_rooms,
//       double_room_security,
//       double_amenities,

//       triple_rent,
//       triple_total_rooms,
//       triple_vacant_rooms,
//       triple_room_security,
//       triple_amenities,
//     } = req.body;

//     //get owner id

//     const owner_id = req.user._id;

//     //check that this owner has already register pg with same name ,same location ,same status,same description

//     const pre_property = await Property.findOne({
//       propertyName: propertyName.trim(),
//       location: location.trim(),
//       status,
//       description: description.trim(),
//       owner: owner_id,
//     });

//     // if exists
//     if (pre_property) {
//       return res.status(400).json({
//         message: "This property already exists for this owner.",
//       });
//     }

//     // Upload images to Cloudinary
//     let imageUrls = [];

//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map((file) =>
//         uploadOnCloudinary(file.path)
//       );
//       imageUrls = (await Promise.all(uploadPromises)).filter((url) => url); // null hata do
//     }
//     //new property add
//     const newProperty = new Property({
//       propertyName,
//       location,
//       status,
//       tenetType,
//       isFurnished,
//       city,
//       description,
//       owner: owner_id,
//       images: imageUrls,

//       common_amenities,

//       single_rent,
//       single_total_rooms,
//       single_vacant_rooms,
//       single_room_security,
//       single_amenities,

//       double_rent,
//       double_total_rooms,
//       double_vacant_rooms,
//       double_room_security,
//       double_amenities,

//       triple_rent,
//       triple_total_rooms,
//       triple_vacant_rooms,
//       triple_room_security,
//       triple_amenities,
//     });

//     const savedProperty = await newProperty.save();

//     //now push this property -> owner db property
//     await User.findByIdAndUpdate(owner_id, {
//       $push: { properties: savedProperty._id },
//     });

//     return res.status(201).json({
//       message: "Property added successfully",
//       property: savedProperty,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// edit pg
const editPg = async (req, res) => {
  try {
    //get the id -> jisse tum edit krna cahte ho

    const propertyId = req.params.id || req.query.id;
    // data fetch kr liya jisko edit krna ho
    const updates = req.body;
    console.log(updates);

    //check to kr lo bhai ki exit bhi krti hi ki bs update hi maar rhe hi  lol
    const property = await Property.findById(propertyId);

    // agr nhi krti hi to kyu add krna
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // bhai sun -> check to kr le ki owner jisko updtae maar rha hi vo uski ki property hi ya ansh ki property edit maar rha

    if (property.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this property" });
    }

    // bhai property ka naam nhi krvana cahte hum vo asise hi rakho
    if (
      updates.propertyName &&
      updates.propertyName !== property.propertyName
    ) {
      return res
        .status(400)
        .json({ message: "Property name cannot be changed" });
    }

    // mera bhai ye sirf chekc kr rha hi key property Nme na ho bs
    Object.keys(updates).forEach((key) => {
      if (key !== "propertyName") {
        property[key] = updates[key];
      }
    });

    const updatedProperty = await property.save();

    return res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all personal pg
const getAllPg = async (req, res) => {
  try {
    const owner_id = req.user._id;
    //jo bhi owner login hi usi ki sari property auengi ddosro ki property nhi dekh sakega
    const properties = await Property.find({ owner: owner_id })
      .populate("owner", "firstname lastname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Your properties fetched successfully",
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get specific pg
const getGivenPg = async (req, res) => {
  try {
    //jis pg ko dekhna hi uski id nikaal lo
    const propertyId = req.params.id;

    // us id ke accrding particular property nikaal li hi
    const property = await Property.findById(propertyId).populate(
      "owner",
      "firstname lastname email phone"
    );

    // bhai agr property hai hi nhi to kaise dikhaege
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property fetched successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete personal pg
const removePg = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user._id;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // are you sure? ki ye property isi owner ki hi
    if (property.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own property" });
    }

    // agr haan to delete kr do mere ko kya
    await Property.findByIdAndDelete(propertyId);

    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//ye hi filter krne wala controler
const filterPg = async (req, res) => {
  try {
    const { location, city, amenities, minPrice, maxPrice } = req.query;

    let filter = {};

    // Location filter (case-insensitive)
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // City filter (case-insensitive)
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    // Amenities filter (common amenities)
    if (amenities) {
      const amenitiesArray = amenities.split(",").map((a) => a.trim());
      filter.common_amenities = { $all: amenitiesArray };
      // $all ensures all specified amenities are present
    }

    // Rent filter: yaha single_rent, double_rent, triple_rent alag-alag ho sakte hai
    if (minPrice || maxPrice) {
      filter.$or = []; // multiple room type ke rent consider karne ke liye

      const rentTypes = ["single_rent", "double_rent", "triple_rent"];

      rentTypes.forEach((type) => {
        let rentFilter = {};
        if (minPrice) rentFilter.$gte = Number(minPrice);
        if (maxPrice) rentFilter.$lte = Number(maxPrice);
        filter.$or.push({ [type]: rentFilter });
      });
    }

    // sirf active properties
    filter.status = "Active";

    const properties = await Property.find(filter)
      .populate("owner", "firstname lastname email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Filtered properties fetched successfully",
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { AddPg, editPg, getAllPg, getGivenPg, removePg, filterPg };
