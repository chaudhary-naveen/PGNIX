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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { PieChart } from "@mui/x-charts/PieChart";

const ParticularPgPage = ({ selectPg, setOpen, open }) => {

  const theme = useTheme();
  
  const handleClose = () => setOpen(false);
  const tableRowPadding = 1.7;

  const VacancyData = [
    { id: "single", label: "Single", value: selectPg?.single_vacant_rooms },
    { id: "double", label: "Double", value: selectPg?.double_vacant_rooms },
    { id: "triple", label: "Triple", value: selectPg?.triple_vacant_rooms },
  ];

  const totalVacantRooms = VacancyData.reduce((acc, room) => acc + room.value, 0);
  const totalRooms = selectPg?.single_total_rooms + selectPg?.double_total_rooms + selectPg?.triple_total_rooms;
  const OccupiedRooms = totalRooms - totalVacantRooms;

  const OccupiedData = [
    { id: "Occupied", label: "Occupied", value: OccupiedRooms },
    { id: "Vacant", label: "Vacant", value: totalVacantRooms }
  ];


  const totalRent = (selectPg?.single_total_rooms - selectPg?.single_vacant_rooms) * selectPg?.single_rent + (selectPg?.double_total_rooms - selectPg?.double_vacant_rooms) * selectPg?.double_rent + (selectPg?.triple_total_rooms - selectPg?.triple_vacant_rooms) * selectPg?.triple_rent;
  const totalSecurity = (selectPg?.single_total_rooms - selectPg?.single_vacant_rooms) * selectPg?.single_room_security + (selectPg?.double_total_rooms - selectPg?.double_vacant_rooms) * selectPg?.double_room_security + (selectPg?.triple_total_rooms - selectPg?.triple_vacant_rooms) * selectPg?.triple_room_security;

  const deductedRent =
    (selectPg?.single_vacant_rooms || 0) * selectPg?.single_rent +
    (selectPg?.double_vacant_rooms || 0) * selectPg?.double_rent +
    (selectPg?.triple_vacant_rooms || 0) * selectPg?.triple_rent;

  // ✅ Deducted Security from vacant rooms
  const deductedSecurity =
    (selectPg?.single_vacant_rooms || 0) * selectPg?.single_room_security +
    (selectPg?.double_vacant_rooms || 0) * selectPg?.double_room_security +
    (selectPg?.triple_vacant_rooms || 0) * selectPg?.triple_room_security;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="pg-dialog-title"
      fullScreen
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
        <div>
          {selectPg?.propertyName?.toUpperCase() || "PG Details"} <span style={{ fontSize: "1.2rem", color: "#B0BEC5" }}>
            {selectPg?.location + ", " + selectPg?.city}
          </span>
        </div>
        <Chip
          label={selectPg?.tenetType?.toUpperCase() + " ONLY"}
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
        <div className="row mt-4">
          <div className="col-6">
            <Card
              sx={{
                p: 2, // reduced padding
                borderRadius: "16px",
                bgcolor: "#2C3E50", // dark blue background
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#FFFFFF", marginBottom: "8px" }}>Vacant Rooms</h5>
              <Divider sx={{ borderColor: "#FF4081", mb: 1.5, width: "100%" }} /> {/* thinner spacing */}

              <PieChart
                width={200}
                height={160}
                series={[
                  {
                    innerRadius: 30,
                    outerRadius: 60,
                    data: VacancyData,
                    arcLabel: "value",
                    labelStyle: { fill: "#E0E1DD", fontWeight: 600 },
                  },
                ]}
              />
            </Card>
          </div>

          <div className="col-6">
            <Card
              sx={{
                p: 2, // reduced padding
                borderRadius: "16px",
                bgcolor: "#2C3E50",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#FFFFFF", marginBottom: "8px" }}>Vacant / Occupied</h5>
              <Divider sx={{ borderColor: "#FF4081", mb: 1.5, width: "100%" }} />

              <PieChart
                width={200}   // ✅ reduced width
                height={160}  // ✅ reduced height
                series={[
                  {
                    innerRadius: 30,
                    outerRadius: 60,
                    data: OccupiedData,
                    arcLabel: "value",
                    labelStyle: { fill: "#E0E1DD", fontWeight: 600 },
                  },
                ]}
              />
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
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <h5
                style={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontFamily: "sans-serif", // ✅ Sans-serif font
                }}
              >
                Capital
              </h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#F5F5F5" }}>Rent</span>
                <span style={{ color: "#FFFFFFFF", fontFamily: "sans-serif" }}>
                  {totalRent.toLocaleString()} per month
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ color: "#F5F5F5" }}>Security Money</span>
                <span style={{ color: "#FFFFFFFF", fontFamily: "sans-serif" }}>
                  {totalSecurity.toLocaleString()}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ color: "#F5F5F5" }}>Deducted Rent (Vacant)</span>
                <span style={{ color: "#FF6B6B", fontFamily: "sans-serif" }}>
                  {deductedRent.toLocaleString()} per month
                </span>
              </div>


              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ color: "#F5F5F5" }}>Deducted Security (Vacant)</span>
                <span style={{ color: "#FF6B6B", fontFamily: "sans-serif" }}>
                  {deductedSecurity.toLocaleString()}
                </span>
              </div>

              <Divider sx={{ borderColor: "#FF4081", my: 2 }} />

              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span style={{ color: "#F5F5F5" }}>Total Rent ( current - vacant)</span>
                <span style={{ color: "#FFFFFFFF", fontFamily: "sans-serif" }}>
                  {(totalRent - deductedRent).toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                <span style={{ color: "#F5F5F5" }}>Security Rent ( current - vacant)</span>
                <span style={{ color: "#FFFFFFFF", fontFamily: "sans-serif" }}>
                  {(totalSecurity - deductedSecurity).toLocaleString()}
                </span>
              </div>
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
              <h5 style={{ color: "#FFFFFF" }}>Room Data</h5>
              <Divider sx={{ borderColor: "#FF4081", my: 1.5 }} />
              <Table sx={{ color: "#F5F5F5" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}></TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>Single</TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>Double</TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>Triple</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Rent row */}
                  <TableRow>
                    <TableCell sx={{ color: "#F5F5F5", fontWeight: "bold", py: tableRowPadding }}>
                      Rent
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.single_rent}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.double_rent}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.triple_rent}
                    </TableCell>
                  </TableRow>

                  {/* Occupied row */}
                  <TableRow>
                    <TableCell sx={{ color: "#F5F5F5", fontWeight: "bold", py: tableRowPadding }}>
                      Occupied
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.single_total_rooms - selectPg?.single_vacant_rooms}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.double_total_rooms - selectPg?.double_vacant_rooms}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {selectPg?.triple_total_rooms - selectPg?.triple_vacant_rooms}
                    </TableCell>
                  </TableRow>

                  {/* Revenue row */}
                  <TableRow>
                    <TableCell sx={{ color: "#F5F5F5", fontWeight: "bold", py: tableRowPadding }}>
                      Revenue
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {(selectPg?.single_total_rooms - selectPg?.single_vacant_rooms) *
                        selectPg?.single_rent}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {(selectPg?.double_total_rooms - selectPg?.double_vacant_rooms) *
                        selectPg?.double_rent}
                    </TableCell>
                    <TableCell sx={{ color: "#F5F5F5", py: tableRowPadding }}>
                      {(selectPg?.triple_total_rooms - selectPg?.triple_vacant_rooms) *
                        selectPg?.triple_rent}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

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
