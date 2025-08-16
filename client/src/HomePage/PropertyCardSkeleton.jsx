import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const PropertyCardSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#1B263B",
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        border: "1px solid #415A77",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        width={144} // matches w-36
        height={112} // matches h-28
        sx={{ borderRadius: 1 }}
      />

      {/* Content Skeleton */}
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={28} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="50%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 0.5 }} />
      </Box>

      {/* Button Skeleton */}
      <Skeleton
        variant="rectangular"
        width={100}
        height={40}
        sx={{ borderRadius: 2 }}
      />
    </Box>
  );
};

export default PropertyCardSkeleton;
