import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "./../path";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import { AppBar, Toolbar, Typography, Box, Select, MenuItem, TextField, FormControl, InputLabel, Button, Autocomplete, Chip } from "@mui/material";
import cities from './../cities.json'


// PG Card Component
function PGCard({ pg }) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#1B263B] rounded-2xl shadow p-4 border border-[#415A77] hover:shadow-lg transition items-center space-x-6">
      <img
        src={pg.images?.length > 0 ? pg.images[0] : ""}
        alt={pg.propertyName}
        className="w-36 h-28 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1">
        <h2 className="text-l font-semibold text-[#E0E1DD]">{pg.propertyName}</h2>
        <p className="text-[#AEB6BF] cd">{pg.location}</p>
        <p className="text-[#AEB6BF]">Rent: ₹ {pg.triple_rent} - {pg.single_rent}</p>
        <p className="text-[#AEB6BF]">Security: ₹ {pg.triple_room_security} - {pg.single_room_security}</p>
        <p className="text-[#AEB6BF]">Furnishing: {pg.isFurnished ? "Full Furnishing" : "No Furnishing"}</p>
        <p className="font-semibold text-[#AEB6BF]">{pg.tenetType}</p>
      </div>
      <button
        className="px-4 py-2 rounded-xl text-[#0D1B2A] bg-[#E0E1DD] hover:bg-[#C6C7C4] transition-colors"
        onClick={() => navigate(`/product?id=${pg._id}`)}
      >
        View Property
      </button>
    </div>
  );
}



// Home Page
export default function Home() {

  const [city, setCity] = useState("");
  const [rentLow, setRentLow] = useState(null);
  const [rentMax, setRentMax] = useState(null);
  const [amenity, setAmenity] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [location, setLocation] = useState("");

  const [pgData, setPgData] = useState([]);
  const fetchPgs = async () => {
    try {
      const response_from_server = await axios.get(`${path}/api/v1/pg/filter`, {
        params: {
          city,
          minRent: rentLow,
          maxRent: rentMax,
          amenities,
          location
        }
      });
      if (response_from_server.status === 200) {
        setPgData(response_from_server.data.properties);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPgs();
    }, 1000);
  }, [city, amenities]);

  return (
    <div>
      <header className="flex flex-col items-center justify-between px-5 py-3 bg-[#0D1B2A] text-[#E0E1DD] gap-4">
        {/* Search Row with City Select */}
        <div className="flex flex-col sm:flex-row items-center w-full gap-2">
          {/* City Select */}
          <Autocomplete
            options={cities.list}
            value={city}
            onChange={(event, newValue) => setCity(newValue)}
            sx={{
              width: { xs: "100%", sm: 256 },
              "& .MuiOutlinedInput-root": {
                padding: "2px 8px", // matches px-2 py-1
                color: "#E0E1DD",
                backgroundColor: "#1B263B",
                border: "1px solid #d1d5db", // border-gray-300
                borderRadius: "4px", // matches rounded
                "& fieldset": { border: "none" }, // remove MUI's default outline
                "&:hover": { borderColor: "#60a5fa" }, // hover similar to tailwind focus:border-blue-500
                "&.Mui-focused": { borderColor: "#3b82f6" }, // focus:border-blue-500
              },
              "& .MuiSvgIcon-root": { color: "#E0E1DD" },
              "& .MuiInputLabel-root": { color: "#E0E1DD" },
              "& .MuiAutocomplete-popupIndicator": { color: "#E0E1DD" },
              "& .MuiAutocomplete-clearIndicator": { color: "#E0E1DD" },
              "& .MuiAutocomplete-option": {
                backgroundColor: "#1B263B",
                color: "#E0E1DD",
                "&[aria-selected='true']": { backgroundColor: "#2f4256" },
                "&:hover": { backgroundColor: "#2f4256" }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select City..."
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  sx: { padding: 0 } // remove extra padding from MUI
                }}
              />
            )}
          />


          {/* Search Input */}
          <input
            type="text"
            value={location}
            onChange={()=>setLocation(e.target.value)}
            placeholder="Locality"
            className="px-2 py-[9px] border border-gray-300 rounded text-[#E0E1DD] bg-[#1B263B] focus:outline-none focus:border-blue-500 w-full sm:w-64"
          />

          {/* Search Button */}
          <button className="px-3 py-[9px] text-[#1B263B] bg-[#E0E1DD] rounded hover:bg-[#E0E1DF] transition-colors">
            Search Properties
          </button>
        </div>

        {/* AppBar Filters */}
        <AppBar position="static" sx={{ backgroundColor: "#0D1B2A", p: 1, width: "100%" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexWrap: "wrap" }}>

            <TextField
              label="Amenities"
              type="text"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              variant="outlined"
            />

            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #ff5f6d, #ffc371)',
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "#b82d39", // darker red on hover
                },
              }}
              onClick={() => {
                if (amenity.trim() !== "") {
                  setAmenities([...amenities, amenity]);
                  setAmenity("");
                }
              }}
            >
              Add Amenity
            </Button>

            <div className="mx-10"></div>

            <TextField
              label="Rent Low"
              type="number"
              value={rentLow}
              onChange={(e) => setRentLow(e.target.value)}
              variant="outlined"
            />

            {/* Rent Max */}
            <TextField
              label="Rent Max"
              type="number"
              value={rentMax}
              onChange={(e) => setRentMax(e.target.value)}
              variant="outlined"
            />

            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #ff5f6d, #ffc371)',
                color: "#FFFFFF",
                fontWeight: 600,
                borderRadius: "8px",
                textTransform: "none",
                px: 3,
                py: 1,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  backgroundColor: "#b82d39", // darker red on hover
                },
              }}
            >
              Apply Range Filter
            </Button>

          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "4px",
          }}
        > {
            amenities.length > 0 && (
              <p className="mb-0">Showing results only for : </p>
            )
          }

          {
            amenities.map((amenity, index) => {
              // Ensure it's a string before processing
              const label =
                typeof amenity === "string" && amenity.length > 0
                  ? amenity.toUpperCase()
                  : "";

              const handleDelete = () => {
                const updatedAmenities = amenities.filter((_, i) => i !== index);
                setAmenities(updatedAmenities); // Assuming you have setAmenities in state
              };

              return label ? (
                <Chip
                  key={index}
                  label={label}
                  onDelete={handleDelete}
                  sx={{ margin: 0.5 }}
                />
              ) : null;
            })

          }

        </div>
        {/* Page Heading */}
        <div className="text-center mt-2">
          <h1 className="text-2xl font-bold text-[#E0E1DD]">Showing Properties in Sector 62, Noida</h1>

        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#0D1B2A]">
        {pgData.length > 0
          ? pgData.map((pg) => <PGCard key={pg.id} pg={pg} />)
          : Array.from({ length: 8 }).map((_, idx) => <PropertyCardSkeleton key={idx} />)}
      </div>
    </div>

  );
}
