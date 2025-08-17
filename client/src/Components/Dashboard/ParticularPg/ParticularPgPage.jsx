import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Card,
  useTheme,
  Divider,
} from "@mui/material";

const ParticularPgPage = ({ selectPg, setOpen, open }) => {
  const theme = useTheme();
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="pg-dialog-title"
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: "linear-gradient(135deg, #1D2A6D, #2A3A5A)", // dark blue gradient background
          color: "#FFFFFF", // white text
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {/* 🔹 Title */}
      <DialogTitle
        id="pg-dialog-title"
        sx={{
          fontSize: "2.5rem",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#FFFFFF", // white title
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {selectPg?.propertyName?.toUpperCase() || "PG Details"}
        <Chip
          label={selectPg?.isCoed ? "Co-ed PG" : "No Co-ed PG"}
          sx={{
            background: "linear-gradient(45deg, #FF4081, #FF6D00)", // pink to orange
            color: "#fff",
            fontWeight: 600,
            px: 2,
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </DialogTitle>

      {/* 🔹 Content */}
      <DialogContent dividers sx={{ px: 4, py: 6 }}>
        {/* --- Left (Info) and Right (Expenses) --- */}
        <div className="row">
          <div className="col-6">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50", // dark blue background
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF", marginBottom: "12px" }}>Details</h5>
              <Divider sx={{ borderColor: "#FF4081", mb: 2 }} /> {/* pink divider */}
              <p style={{ color: "#F5F5F5" }}><b>Status:</b> {selectPg?.status}</p>
              <p style={{ color: "#F5F5F5" }}><b>Location:</b> {selectPg?.location}</p>
              <p style={{ color: "#F5F5F5" }}><b>Furnishing:</b> {selectPg?.isFurnished ? "Fully Furnished" : "Unfurnished"}</p>
            </Card>
          </div>

          <div className="col-6">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF", fontWeight: 700 }}>Expenses</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#F5F5F5" }}>Rent</span>
                <span style={{ color: "#FF6D00", fontWeight: 600 }}>{selectPg?.rent}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ color: "#F5F5F5" }}>Security Money</span>
                <span style={{ color: "#FF6D00", fontWeight: 600 }}>{selectPg?.securityMoney}</span>
              </div>
              <Divider sx={{ borderColor: "#FF4081", my: 2 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span style={{ color: "#F5F5F5" }}>Total</span>
                <span style={{ color: "#FF6D00" }}>
                  {(selectPg?.securityMoney || 0) + (selectPg?.rent || 0)}
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* --- Tenants & Rooms --- */}
        <div className="row mt-4">
          <div className="col-6">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF" }}>Tenants</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <p style={{ color: "#F5F5F5" }}>Total People: {selectPg?.totalTenants}</p>
              <p style={{ color: "#F5F5F5" }}>Total Boys: {selectPg?.totalBoys}</p>
              <p style={{ color: "#F5F5F5" }}>Total Girls: {selectPg?.totalGirls}</p>
            </Card>
          </div>

          <div className="col-6">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF" }}>Rooms</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <p style={{ color: "#F5F5F5" }}>Total Rooms: {selectPg?.totalRooms}</p>
              <p style={{ color: "#F5F5F5" }}>AC Rooms: {selectPg?.acRooms}</p>
              <p style={{ color: "#F5F5F5" }}>Non-AC Rooms: {selectPg?.nonAcRooms}</p>
            </Card>
          </div>
        </div>

        {/* --- Description --- */}
        <div className="row mt-4">
          <div className="col-12">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF" }}>Description</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <p style={{ color: "#F5F5F5" }}>{selectPg?.description}</p>
            </Card>
          </div>
        </div>

        {/* --- Images --- */}
        <div className="row mt-4">
          <div className="col-12">
            <Card
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5 style={{ color: "#FFFFFF" }}>Images</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {selectPg?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property Image ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      border: "2px solid #FF4081", // pink border
                      boxShadow: "0 0 12px rgba(255, 64, 129, 0.5)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 64, 129, 0.7)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 64, 129, 0.5)";
                    }}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>

      {/* 🔹 Actions */}
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={handleClose}
          sx={{
            background: "linear-gradient(45deg, #FF4081, #FF6D00)", // pink to orange
            color: "#fff",
            fontWeight: 700,
            borderRadius: "30px",
            px: 4,
            py: 1.2,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            "&:hover": {
              background: "linear-gradient(45deg, #F50057, #FF3D00)", // darker pink to orange
              boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticularPgPage;
