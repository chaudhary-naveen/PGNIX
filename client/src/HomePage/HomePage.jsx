import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "./../path";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import { AppBar, Toolbar, Typography, Box, Select, MenuItem, TextField, FormControl, InputLabel, Button } from "@mui/material";

// Header Component with Search + Filter AppBar
function Header() {
  const [livingType, setLivingType] = useState("");
  const [rentLow, setRentLow] = useState("");
  const [rentMax, setRentMax] = useState("");

  return (
    <header className="flex flex-col items-center justify-between px-5 py-3 bg-[#0D1B2A] text-[#E0E1DD] gap-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center w-full gap-2">
        <input
          type="text"
          placeholder="Search PGs..."
          className="px-2 py-1 border border-gray-300 rounded text-[#E0E1DD] bg-[#1B263B] focus:outline-none focus:border-blue-500 w-full sm:w-64"
        />
        <button className="px-3 py-1 text-[#1B263B] bg-[#E0E1DD] rounded hover:bg-[#E0E1DF] transition-colors">
          Search Properties
        </button>
      </div>

      {/* AppBar Filters */}
      <AppBar position="static" sx={{ backgroundColor: "#0D1B2A", p: 1, width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start", gap: 2, flexWrap: "wrap" }}>
          {/* Type of Living */}
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel sx={{ color: "#E0E1DD" }}>Type of Living</InputLabel>
            <Select
              value={livingType}
              onChange={(e) => setLivingType(e.target.value)}
              sx={{
                color: "#E0E1DD",
                backgroundColor: "#1B263B",
                ".MuiSvgIcon-root": { color: "#E0E1DD" },
              }}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Double">Double</MenuItem>
              <MenuItem value="Shared">Shared</MenuItem>
            </Select>
          </FormControl>

          {/* Rent Low */}
          {/* Rent Low */}
          <TextField
            label="Rent Low"
            type="number"
            value={rentLow}
            onChange={(e) => setRentLow(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: {
                input: { color: "#E0E1DD", /* remove spin buttons */ "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 }, "&[type=number]": { MozAppearance: "textfield" } },
                label: { color: "#E0E1DD" },
                fieldset: { borderColor: "#415A77" },
                "&:hover fieldset": { borderColor: "#2f4256" },
                "&.Mui-focused fieldset": { borderColor: "#415A77" },
                minWidth: 100,
                backgroundColor: "#1B263B",
                borderRadius: 1,
              }
            }}
          />

          {/* Rent Max */}
          <TextField
            label="Rent Max"
            type="number"
            value={rentMax}
            onChange={(e) => setRentMax(e.target.value)}
            variant="outlined"
            InputProps={{
              sx: {
                input: { color: "#E0E1DD", "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 }, "&[type=number]": { MozAppearance: "textfield" } },
                label: { color: "#E0E1DD" },
                fieldset: { borderColor: "#415A77" },
                "&:hover fieldset": { borderColor: "#2f4256" },
                "&.Mui-focused fieldset": { borderColor: "#415A77" },
                minWidth: 100,
                backgroundColor: "#1B263B",
                borderRadius: 1,
              }
            }}
          />


          <Button
            variant="contained"
            sx={{
              backgroundColor: "#415A77",
              color: "#E0E1DD",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#2f4256" },
            }}
          >
            Apply Filters
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Heading */}
      <div className="text-center mt-2">
        <h1 className="text-2xl font-bold text-[#E0E1DD]">Showing Properties in Sector 62, Noida</h1>
        <p className="text-sm text-gray-400">Filters : Bachelor, Male, Parking</p>
      </div>
    </header>
  );
}

// PG Card Component
function PGCard({ pg }) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#1B263B] rounded-2xl shadow p-4 border border-[#415A77] hover:shadow-lg transition items-center space-x-6">
      <img
        src={pg.image}
        alt={pg.name}
        className="w-36 h-28 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1">
        <h2 className="text-l font-semibold text-[#E0E1DD]">{pg.propertyName}</h2>
        <p className="text-[#AEB6BF]">{pg.location}</p>
        <p className="text-[#AEB6BF]">Rent: ₹{pg.rent}</p>
        <p className="text-[#AEB6BF]">Security: ₹{pg.security_money}</p>
        <p className="text-[#AEB6BF]">Furnishing: {pg.isFurnished ? "Full Furnishing" : "No Furnishing"}</p>
        <p className="font-semibold text-[#AEB6BF]">{pg.co_ed ? "Co - Living" : "Single Type"}</p>
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

// PG List Component
function PGList() {
  const [pgData, setPgData] = useState([]);

  const fetchPgs = async () => {
    try {
      const response_from_server = await axios.get(`${path}/api/v1/pg/filter`);
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
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#0D1B2A]">
      {pgData.length > 0
        ? pgData.map((pg) => <PGCard key={pg.id} pg={pg} />)
        : Array.from({ length: 8 }).map((_, idx) => <PropertyCardSkeleton key={idx} />)}
    </div>
  );
}

// Home Page
export default function Home() {
  return (
    <div>
      <Header />
      <PGList />
    </div>
  );
}
