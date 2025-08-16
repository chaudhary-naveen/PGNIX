import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";

const AppBarNav = () => {
  const [livingType, setLivingType] = useState("");
  const [rentLow, setRentLow] = useState("");
  const [rentMax, setRentMax] = useState("");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#0D1B2A", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
        <Typography variant="h6" sx={{ color: "#E0E1DD", fontWeight: 700 }}>
          PG Finder
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
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
          <TextField
            label="Rent Low"
            type="number"
            value={rentLow}
            onChange={(e) => setRentLow(e.target.value)}
            variant="outlined"
            sx={{
              input: { color: "#E0E1DD" },
              label: { color: "#E0E1DD" },
              fieldset: { borderColor: "#415A77" },
              "&:hover fieldset": { borderColor: "#2f4256" },
              "&.Mui-focused fieldset": { borderColor: "#415A77" },
              minWidth: 100,
              backgroundColor: "#1B263B",
              borderRadius: 1,
            }}
          />

          {/* Rent Max */}
          <TextField
            label="Rent Max"
            type="number"
            value={rentMax}
            onChange={(e) => setRentMax(e.target.value)}
            variant="outlined"
            sx={{
              input: { color: "#E0E1DD" },
              label: { color: "#E0E1DD" },
              fieldset: { borderColor: "#415A77" },
              "&:hover fieldset": { borderColor: "#2f4256" },
              "&.Mui-focused fieldset": { borderColor: "#415A77" },
              minWidth: 100,
              backgroundColor: "#1B263B",
              borderRadius: 1,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarNav;
