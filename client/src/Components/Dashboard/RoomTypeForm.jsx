import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
    Select,
    Divider,
    Typography,
    Autocomplete,
    FormHelperText,
    Chip
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import cities from "./../../cities.json";
import { useState } from "react";

const RoomSection = ({
  title,
  fieldPrefix,
  formData,
  setFormData,
  amenities,
  setAmenities,
  handleChange,
  handleBlur,
  touched,
  securityError,
}) => {
  const fields = [
    { key: "total_rooms", label: `${title} Total Rooms` },
    { key: "vacant_rooms", label: `${title} Vacant Rooms` },
    { key: "rent", label: `${title} Room Rent (₹)` },
    { key: "room_security", label: "Security Money (₹)" },
  ];

  const commonTextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#444" },
      "&:hover fieldset": { borderColor: "#ff4d4d" },
      "&.Mui-focused fieldset": { borderColor: "#ff4d4d" },
    },
    "& .MuiInputLabel-root": { color: "#b3b3b3" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ff4d4d" },
  };

  return (
    <>
      <Divider
        sx={{
          gridColumn: "1 / -1",
          mt: 1,
          mb: 2,
          background: "linear-gradient(to right, transparent, #444, transparent)",
          height: "1px",
        }}
      />

      {fields.map(({ key, label }) => (
        <TextField
          key={key}
          type="number"
          label={label}
          name={`${fieldPrefix}_${key}`}
          fullWidth
          value={formData[`${fieldPrefix}_${key}`]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            key === "room_security"
              ? !!securityError
              : touched[`${fieldPrefix}_${key}`] &&
                !formData[`${fieldPrefix}_${key}`]
          }
          helperText={
            key === "room_security"
              ? securityError
              : touched[`${fieldPrefix}_${key}`] &&
                !formData[`${fieldPrefix}_${key}`]
              ? "Required"
              : ""
          }
          sx={commonTextFieldStyle}
        />
      ))}

      {/* Amenities Input */}
      <TextField
        label={`${title} Amenities`}
        name={`${fieldPrefix}_amenities`}
        fullWidth
        value={amenities[`${fieldPrefix}_amenities`] || ""}
        onChange={(e) =>
          setAmenities({ ...amenities, [`${fieldPrefix}_amenities`]: e.target.value })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setFormData({
              ...formData,
              [`${fieldPrefix}_amenities`]: [
                ...(formData[`${fieldPrefix}_amenities`] || []),
                amenities[`${fieldPrefix}_amenities`],
              ],
            });
            setAmenities({ ...amenities, [`${fieldPrefix}_amenities`]: "" });
          }
        }}
        onBlur={handleBlur}
        helperText="Hit Enter for multiple entries"
        sx={commonTextFieldStyle}
      />

      {/* Amenities List */}
      <div>
        {formData[`${fieldPrefix}_amenities`]?.length > 0 &&
          formData[`${fieldPrefix}_amenities`].map((amenity, index) => (
            <Chip key={index} label={amenity} className="mx-1" />
          ))}
      </div>
    </>
  );
};

export default RoomSection;
