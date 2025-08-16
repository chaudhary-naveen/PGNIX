const User = require("../Models/User");
const Property = require("./../Models/Properties");

// add pg
const AddPg = async (req, res) => {
  try {
    const {
      propertyName,
      location,
      status,
      rent,
      co_ed,
      totalRooms,
      Ac_rooms,
      isFurnished,
      description,
      typesOfRoom,
    } = req.body;

    //get owner id
    const owner_id = req.user._id;

    //check that this owner has already register pg with same name ,same location ,same status,same description

    const pre_property = await Property.findOne({
      propertyName: propertyName.trim(),
      location: location.trim(),
      status,
      description: description.trim(),
      owner: owner_id, // ensure it's this owner's property
    });

    // if exists
    if (pre_property) {
      return res.status(400).json({
        message: "This property already exists for this owner.",
      });
    }

    //new property add
    const newProperty = new Property({
      propertyName,
      location,
      status,
      rent,
      co_ed,
      totalRooms,
      Ac_rooms,
      isFurnished,
      description,
      owner: owner_id,
      typesOfRoom,
    });

    const savedProperty = await newProperty.save();

    //now push this property -> owner db property
    await User.findByIdAndUpdate(owner_id, {
      $push: { properties: savedProperty._id },
    });

    return res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// edit pg
const editPg = async (req, res) => {
  try {
    //get the id -> jisse tum edit krna cahte ho
    const propertyId = req.params.id;
    // data fetch kr liya jisko edit krna ho
    const updates = req.body;

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
    const {
      location,
      roomTypes, //ye yaar list ayegi like ki agr kisi ko single aur double dekhna ho pr triple nhi to
      propertyName,
      minRent,
      maxRent,
      co_ed,
      isFurnished,
    } = req.query;

    let filter = {};

    // Location filter pr  case-insensitive
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Property name filter (case-insensitive)
    if (propertyName) {
      filter.propertyName = { $regex: propertyName, $options: "i" };
    }

    // Room Types filter
    if (roomTypes) {
      const typesArray = roomTypes.split(",").map((t) => t.trim());
      filter.typesOfRoom = { $in: typesArray };
    }

    // Rent range filter
    if (minRent || maxRent) {
      filter.rent = {};
      if (minRent) filter.rent.$gte = Number(minRent);
      if (maxRent) filter.rent.$lte = Number(maxRent);
    }

    // Co-ed filter
    if (co_ed !== undefined) {
      filter.co_ed = co_ed === "true";
    }

    // isFurnished filter
    if (isFurnished !== undefined) {
      filter.isFurnished = isFurnished === "true";
    }
    // ab jo bhi filter lgaye ho uso ke acc property ayegi
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
