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
  Chip,
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import cities from "./../../cities.json";
import { set } from "mongoose";
import RoomSection from "./RoomTypeForm";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff4d4d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00e676",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const AddNewPg = ({ open, setOpen }) => {

  const [amenities, setAmenities] = React.useState({
    single: "",
    double: "",
    triple: "",
    common: ""
  });

  const [formData, setFormData] = React.useState({
    propertyName: "",
    location: "",
    status: "Active",
    tenetType: "co_ed",
    isFurnished: "",
    description: "",
    city: "",
    images: [],
    common_amenities: [],

    single_rent: "",
    single_total_rooms: "",
    single_vacant_rooms: "",
    single_room_security: "",
    single_amenities: [],

    double_rent: "",
    double_total_rooms: "",
    double_vacant_rooms: "",
    double_room_security: "",
    double_amenities: [],

    triple_rent: "",
    triple_total_rooms: "",
    triple_vacant_rooms: "",
    triple_room_security: "",
    triple_amenities: [],

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

    console.log("You have reached");

    console.log("New PG Data:", formData);
    handleClose();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Existing + New Images
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            width: "90%",
            maxWidth: "90%",
            backgroundImage: "linear-gradient(to right, #1a1a1a, #2a2a2a)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "1px",
            padding: "24px 24px 16px",
            background: "linear-gradient(to right, #ff4d4d, #f957cb)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          CREATE NEW PROPERTY
          <Divider
            sx={{
              mt: 2,
              background:
                "linear-gradient(to right, transparent, #ff4d4d, transparent)",
              height: "2px",
            }}
          />
        </DialogTitle>

        <DialogContent sx={{ padding: "24px" }}>
          <Box component="form" onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              {/* Form Fields */}
              <TextField
                label="Property Name"
                name="propertyName"
                fullWidth
                value={formData.propertyName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.propertyName && !formData.propertyName}
                helperText={
                  touched.propertyName && !formData.propertyName
                    ? "Required"
                    : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff4d4d",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff4d4d",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b3b3b3",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ff4d4d",
                  },
                }}
              />
              <TextField
                label="Location (Street, Area)"
                name="location"
                fullWidth
                value={formData.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && !formData.location}
                helperText={
                  touched.location && !formData.location ? "Required" : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff4d4d",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff4d4d",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b3b3b3",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ff4d4d",
                  },
                }}
              />
              <Autocomplete
                options={cities.list}
                value={formData.city || null}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({ ...prev, city: newValue || "" }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#ff4d4d",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ff4d4d",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#b3b3b3",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#ff4d4d",
                      },
                    }}
                  />
                )}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel sx={{ color: "#b3b3b3" }}>Tenet Type</InputLabel>
                <Select
                  name="tenetType"
                  value={formData.tenetType}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#444",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff4d4d",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff4d4d",
                    },
                    "& .MuiSelect-icon": {
                      color: "#b3b3b3",
                    },
                  }}
                >
                  <MenuItem value="male">Male Only</MenuItem>
                  <MenuItem value="female">Female Only</MenuItem>
                  <MenuItem value="co_ed">CO-ED</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel sx={{ color: "#b3b3b3" }}>Furnishing</InputLabel>
                <Select
                  name="isFurnished"
                  value={formData.isFurnished}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#444",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff4d4d",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff4d4d",
                    },
                    "& .MuiSelect-icon": {
                      color: "#b3b3b3",
                    },
                  }}
                >
                  <MenuItem value="Furnished">Yes</MenuItem>
                  <MenuItem value="Unfurnished">No</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  gridColumn: "1 / -1",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff4d4d",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff4d4d",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b3b3b3",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ff4d4d",
                  },
                }}
              />

              <RoomSection
                title="Single"
                fieldPrefix="single"
                formData={formData}
                setFormData={setFormData}
                amenities={amenities}
                setAmenities={setAmenities}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
               
              />

              <RoomSection
                title="Double"
                fieldPrefix="double"
                formData={formData}
                setFormData={setFormData}
                amenities={amenities}
                setAmenities={setAmenities}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
               
              />

              <RoomSection
                title="Triple"
                fieldPrefix="triple"
                formData={formData}
                setFormData={setFormData}
                amenities={amenities}
                setAmenities={setAmenities}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched}
                
              />


              {/* Image Upload Section */}
              <div style={{ gridColumn: "1 / -1", marginTop: "16px" }}>
                <div
                  style={{
                    border: "2px dashed #444",
                    borderRadius: "8px",
                    padding: "20px",
                    textAlign: "center",
                    transition: "all 0.3s",
                    marginBottom: "16px",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    id="image-upload"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      sx={{
                        color: "#ff4d4d",
                        borderColor: "#ff4d4d",
                        textTransform: "none",
                        fontWeight: 500,
                        padding: "8px 16px",
                      }}
                    >
                      Upload Property Images
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ mt: 1, color: "#b3b3b3" }}>
                    Click to browse or drag & drop images here
                  </Typography>
                </div>

                {/* ✅ Uploaded Count */}
                {formData.images.length > 0 && (
                  <Typography variant="body2" sx={{ mb: 1, color: "#b3b3b3" }}>
                    {formData.images.length} image
                    {formData.images.length > 1 ? "s" : ""} uploaded
                  </Typography>
                )}

                {/* ✅ Image Previews */}
                {formData.images.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                      gap: "12px",
                      marginTop: "16px",
                    }}
                  >
                    {formData.images.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "8px",
                          height: "100px",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            border: "1px solid #444",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "rgba(0, 0, 0, 0.7)",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            const newImages = [...formData.images];
                            newImages.splice(index, 1);
                            setFormData({ ...formData, images: newImages });
                          }}
                        >
                          ×
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formData.images.length > 0 && (
                <Typography variant="body2" sx={{ mb: 1, color: "#b3b3b3" }}>
                  {formData.images.length} image
                  {formData.images.length > 1 ? "s" : ""} uploaded
                </Typography>
              )}
            </div>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px" }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              color: "#ff4d4d",
              borderColor: "#ff4d4d",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "rgba(255, 77, 77, 0.1)",
                borderColor: "#ff4d4d",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #ff4d4d, #f957cb)",
              color: "#ffffff",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "8px 24px",
              boxShadow: "0 4px 8px rgba(255, 77, 77, 0.3)",
              "&:hover": {
                background: "linear-gradient(to right, #f957cb, #ff4d4d)",
                boxShadow: "0 6px 10px rgba(255, 77, 77, 0.4)",
              },
            }}
          >
            Add Property
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddNewPg;

// import * as React from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   Divider,
//   Typography,
//   Autocomplete,
//   FormHelperText,
// } from "@mui/material";
// import cities from './../../cities.json'

// const AddNewPg = ({ open, setOpen }) => {

//   const [formData, setFormData] = React.useState({
//     propertyName: "",
//     location: "",
//     status: "Active",
//     rent: "",
//     isCoed: false,
//     totalRooms: "",
//     acRooms: "",
//     isFurnished: "",
//     securityMoney: "",
//     description: "",
//     city: ""
//   });

//   const [touched, setTouched] = React.useState({});
//   const [error, setError] = React.useState("");
//   const [securityError, setSecurityError] = React.useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === "acRooms" || name === "totalRooms") setError("");
//     if (name === "securityMoney") setSecurityError("");
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//   };

//   const handleClose = () => setOpen(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const allTouched = Object.keys(formData).reduce((acc, key) => {
//       acc[key] = true;
//       return acc;
//     }, {});
//     setTouched(allTouched);

//     if (parseInt(formData.acRooms) > parseInt(formData.totalRooms)) {
//       setError("AC Rooms cannot be greater than Total Rooms.");
//       return;
//     }

//     if (parseInt(formData.securityMoney) > parseInt(formData.rent)) {
//       setSecurityError("Security Money cannot be greater than Rent.");
//       return;
//     }

//     for (const [key, value] of Object.entries(formData)) {
//       if (!value && key !== "acRooms") {
//         setError(`${key.replace(/([A-Z])/g, " $1")} is required.`);
//         return;
//       }
//     }

//     console.log("New PG Data:", formData);
//     handleClose();
//   };

//   // Common style for fields
//   const fieldStyle = {
//     backgroundColor: "#ffffff",
//     "& .MuiInputBase-input": { color: "#1e3a8a" },
//     "& .MuiInputLabel-root": { color: "#1e3a8a" },
//     "& .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" },
//     "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e3a8a" }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           width: "90%",
//           maxWidth: "90%",
//           backgroundColor: "#ffffff",
//           color: "#1e3a8a",
//         },
//       }}
//       aria-labelledby="add-pg-dialog-title"
//     >
//       <DialogTitle
//         id="add-pg-dialog-title"
//         sx={{ textAlign: "center", fontSize: "2rem", color: "#1e3a8a" }}
//       >
//         Create New Property
//         <hr style={{ borderColor: "#1e3a8a" }} />
//       </DialogTitle>

//       <DialogContent>
//         <DialogContentText sx={{ color: "#1e3a8a" }}>
//           <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Row 1: Property Name */}
//               <TextField
//                 label="Property Name"
//                 name="propertyName"
//                 fullWidth
//                 value={formData.propertyName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.propertyName && !formData.propertyName}
//                 helperText={
//                   touched.propertyName && !formData.propertyName ? "Required" : ""
//                 }
//                 sx={fieldStyle}
//               />

//               {/* Row 1: Location */}
//               <TextField
//                 label="Location (Street , Area)"
//                 name="location"
//                 fullWidth
//                 value={formData.location}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.location && !formData.location}
//                 helperText={
//                   touched.location && !formData.location ? "Required" : ""
//                 }
//                 sx={fieldStyle}
//               />

//               <Autocomplete
//                 options={cities.list} // your array of cities
//                 value={formData.city || null}
//                 onChange={(event, newValue) => {
//                   setFormData((prev) => ({ ...prev, city: newValue || "" }));
//                 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="City"
//                     variant="outlined"
//                   />
//                 )}
//                 fullWidth
//                 sx={fieldStyle}
//               />

//               <FormControl fullWidth sx={fieldStyle}>
//                 <InputLabel>Co-ed PG</InputLabel>
//                 <Select
//                   name="isCoed"
//                   value={formData.isCoed ? "true" : "false"}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="true">Yes</MenuItem>
//                   <MenuItem value="false">No</MenuItem>
//                 </Select>
//               </FormControl>

//                <div>
//                 <TextField
//                   type="number"
//                   label="AC Rooms"
//                   name="acRooms"
//                   fullWidth
//                   value={formData.acRooms}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   sx={fieldStyle}
//                 />
//                 {error && <FormHelperText error>{error}</FormHelperText>}
//               </div>

//               <div></div>

//               <Divider sx={{ my: 2 }}>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontWeight: 'Normal',
//                     color: 'primary.dark', // darker blue shade from theme
//                   }}
//                 >
//                   Single Rooms
//                 </Typography>
//               </Divider>
//               <div></div>

//               <TextField
//                 type="number"
//                 label="Rent (₹)"
//                 name="rent"
//                 fullWidth
//                 value={formData.rent}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.rent && !formData.rent}
//                 helperText={touched.rent && !formData.rent ? "Required" : ""}
//                 sx={fieldStyle}
//               />

//               {/* Row 3: Security Money */}
//               <TextField
//                 type="number"
//                 label="Security Money (₹)"
//                 name="securityMoney"
//                 fullWidth
//                 value={formData.securityMoney}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={!!securityError}
//                 helperText={securityError}
//                 sx={fieldStyle}
//               />

//               <TextField
//                 type="number"
//                 label="Total Rooms"
//                 name="totalRooms"
//                 fullWidth
//                 value={formData.totalRooms}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.totalRooms && !formData.totalRooms}
//                 helperText={
//                   touched.totalRooms && !formData.totalRooms ? "Required" : ""
//                 }
//                 sx={fieldStyle}
//               />

//               {/* Row 5: Furnishing */}
//               <FormControl fullWidth sx={fieldStyle}>
//                 <InputLabel>Furnishing</InputLabel>
//                 <Select
//                   name="isFurnished"
//                   value={formData.isFurnished}
//                   onChange={handleChange}
//                 >
//                   <MenuItem value="Furnished">Yes</MenuItem>
//                   <MenuItem value="Unfurnished">No</MenuItem>
//                 </Select>
//               </FormControl>

//               {/* Empty Placeholder */}
//               <div></div>

//               {/* Row 6: Description */}
//               <div className="md:col-span-2">
//                 <TextField
//                   label="Description"
//                   name="description"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   value={formData.description}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   sx={fieldStyle}
//                 />
//               </div>
//             </div>
//           </Box>
//         </DialogContentText>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button
//           onClick={handleClose}
//           variant="outlined"
//           sx={{
//             borderColor: "#1e3a8a",
//             color: "#1e3a8a",
//             fontWeight: 600,
//             borderRadius: "12px",
//             "&:hover": {
//               borderColor: "#2563eb",
//               backgroundColor: "#eff6ff",
//               color: "#1e3a8a",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           sx={{
//             backgroundColor: "#1e3a8a",
//             color: "#ffffff",
//             fontWeight: 600,
//             borderRadius: "12px",
//             "&:hover": { backgroundColor: "#2563eb" },
//           }}
//         >
//           Add Property
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddNewPg;
