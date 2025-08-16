import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

function createData(id, name, location, status) {
  return { id, name, location, status };
}

// Sorting Functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "name", label: "Property Name" },
  { id: "location", label: "Location" },
  { id: "status", label: "Status" },
  { id: "details", label: "Details" }, // new column
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: "bold",
              color: "#E0E1DD",
              borderBottom: "1px solid #415A77",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: "#E0E1DD",
                "& .MuiTableSortLabel-icon": { color: "#E0E1DD !important" },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar sx={{ pl: 2, pr: 1 }}>
      <Typography
        sx={{
          flex: "1 1 100%",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#ffffffff",
        }}
        variant="h6"
        component="div"
      >
        PG Property List
      </Typography>
    </Toolbar>
  );
}

export default function PgTableListDashBoard({
  dashboardData,
  setSelectPg,
  setOpen,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const data = dashboardData[0]?.properties.map((obj, index) =>
      createData(index + 1, obj.propertyName, obj.location, obj.status)
    );
    setRows(data || []);
  }, [dashboardData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          backgroundColor: "#0D1B2A",
          color: "#E0E1DD",
          width: "100%",
          mb: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <EnhancedTableToolbar />
        <TableContainer sx={{ width: "90%", color: "#E0E1DD" }}>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  hover
                  tabIndex={1}
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#1B263B",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ color: "#E0E1DD" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#E0E1DD" }}>
                    {row.location}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: row.status === "Active" ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {row.status}
                  </TableCell>
                  {/* Details Button */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setOpen(true);
                        setSelectPg(row.id);
                      }}
                      sx={{
                        backgroundColor: "#415A77", // primary theme
                        color: "#E0E1DD",
                        fontWeight: 600,
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#2f4256",
                        },
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: "#E0E1DD" }}>
                    No Properties Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-actions button": {
              color: "#E0E1DD",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              color: "#E0E1DD",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
