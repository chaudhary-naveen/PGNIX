import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
} from "@mui/material";
import cities from './../../cities.json'

const AddNewPg = ({ open, setOpen }) => {

  const [formData, setFormData] = React.useState({
    propertyName: "",
    location: "",
    status: "Active",
    rent: "",
    isCoed: false,
    totalRooms: "",
    acRooms: "",
    isFurnished: "",
    securityMoney: "",
    description: "",
    city: ""
  });

  const [touched, setTouched] = React.useState({});
  const [error, setError] = React.useState("");
  const [securityError, setSecurityError] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "acRooms" || name === "totalRooms") setError("");
    if (name === "securityMoney") setSecurityError("");
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (parseInt(formData.acRooms) > parseInt(formData.totalRooms)) {
      setError("AC Rooms cannot be greater than Total Rooms.");
      return;
    }

    if (parseInt(formData.securityMoney) > parseInt(formData.rent)) {
      setSecurityError("Security Money cannot be greater than Rent.");
      return;
    }

    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "acRooms") {
        setError(`${key.replace(/([A-Z])/g, " $1")} is required.`);
        return;
      }
    }

    console.log("New PG Data:", formData);
    handleClose();
  };

  // Common style for fields
  const fieldStyle = {
    backgroundColor: "#ffffff",
    "& .MuiInputBase-input": { color: "#1e3a8a" },
    "& .MuiInputLabel-root": { color: "#1e3a8a" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: "90%",
          maxWidth: "90%",
          backgroundColor: "#ffffff",
          color: "#1e3a8a",
        },
      }}
      aria-labelledby="add-pg-dialog-title"
    >
      <DialogTitle
        id="add-pg-dialog-title"
        sx={{ textAlign: "center", fontSize: "2rem", color: "#1e3a8a" }}
      >
        Create New Property
        <hr style={{ borderColor: "#1e3a8a" }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ color: "#1e3a8a" }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Row 1: Property Name */}
              <TextField
                label="Property Name"
                name="propertyName"
                fullWidth
                value={formData.propertyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.propertyName && !formData.propertyName}
                helperText={
                  touched.propertyName && !formData.propertyName ? "Required" : ""
                }
                sx={fieldStyle}
              />

              {/* Row 1: Location */}
              <TextField
                label="Location (Street , Area)"
                name="location"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && !formData.location}
                helperText={
                  touched.location && !formData.location ? "Required" : ""
                }
                sx={fieldStyle}
              />

              <Autocomplete
                options={cities.list} // your array of cities
                value={formData.city || null}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({ ...prev, city: newValue || "" }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                  />
                )}
                fullWidth
                sx={fieldStyle}
              />

              <FormControl fullWidth sx={fieldStyle}>
                <InputLabel>Co-ed PG</InputLabel>
                <Select
                  name="isCoed"
                  value={formData.isCoed ? "true" : "false"}
                  onChange={handleChange}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>

               <div>
                <TextField
                  type="number"
                  label="AC Rooms"
                  name="acRooms"
                  fullWidth
                  value={formData.acRooms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={fieldStyle}
                />
                {error && <FormHelperText error>{error}</FormHelperText>}
              </div>

              <div></div>

              <Divider sx={{ my: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'Normal',
                    color: 'primary.dark', // darker blue shade from theme
                  }}
                >
                  Single Rooms
                </Typography>
              </Divider>
              <div></div>

              <TextField
                type="number"
                label="Rent (₹)"
                name="rent"
                fullWidth
                value={formData.rent}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rent && !formData.rent}
                helperText={touched.rent && !formData.rent ? "Required" : ""}
                sx={fieldStyle}
              />

              {/* Row 3: Security Money */}
              <TextField
                type="number"
                label="Security Money (₹)"
                name="securityMoney"
                fullWidth
                value={formData.securityMoney}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!securityError}
                helperText={securityError}
                sx={fieldStyle}
              />

              
              <TextField
                type="number"
                label="Total Rooms"
                name="totalRooms"
                fullWidth
                value={formData.totalRooms}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.totalRooms && !formData.totalRooms}
                helperText={
                  touched.totalRooms && !formData.totalRooms ? "Required" : ""
                }
                sx={fieldStyle}
              />

              {/* Row 5: Furnishing */}
              <FormControl fullWidth sx={fieldStyle}>
                <InputLabel>Furnishing</InputLabel>
                <Select
                  name="isFurnished"
                  value={formData.isFurnished}
                  onChange={handleChange}
                >
                  <MenuItem value="Furnished">Yes</MenuItem>
                  <MenuItem value="Unfurnished">No</MenuItem>
                </Select>
              </FormControl>

              {/* Empty Placeholder */}
              <div></div>

              {/* Row 6: Description */}
              <div className="md:col-span-2">
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={fieldStyle}
                />
              </div>
            </div>
          </Box>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "#1e3a8a",
            color: "#1e3a8a",
            fontWeight: 600,
            borderRadius: "12px",
            "&:hover": {
              borderColor: "#2563eb",
              backgroundColor: "#eff6ff",
              color: "#1e3a8a",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#1e3a8a",
            color: "#ffffff",
            fontWeight: 600,
            borderRadius: "12px",
            "&:hover": { backgroundColor: "#2563eb" },
          }}
        >
          Add Property
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewPg;
