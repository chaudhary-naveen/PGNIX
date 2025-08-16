import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddNewPg from "./AddNewPg";
import React, { useState } from "react";

const OwnerNameSection = ({ ownerName }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 4,
        flexWrap: "wrap",
      }}
    >
      {/* Welcome Text */}
      <Box>
        <span
          style={{
            fontSize: "2rem",
            color: "#E0E1DD", // secondary text color
            fontWeight: 700,
          }}
        >
          Welcome!{" "}
        </span>
        <span
          style={{
            fontSize: "3rem",
            color: "#ffffffff", // primary text color
            fontWeight: 700,
          }}
        >
          {ownerName}
        </span>
      </Box>

      {/* Add Property Button */}
      <Box>
        <Button
          variant="contained"
          onClick={() => setOpen(!open)}
          sx={{
            backgroundColor: "#415A77", // primary blue
            color: "#E0E1DD", // secondary text
            fontWeight: 600,
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#2f4256", // darker hover shade
            },
          }}
        >
          + Add Property
        </Button>

        {open && <AddNewPg open={open} setOpen={setOpen} />}
      </Box>
    </Box>
  );
};

export default OwnerNameSection;
