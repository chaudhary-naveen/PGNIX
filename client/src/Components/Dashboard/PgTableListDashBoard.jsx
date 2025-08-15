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
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
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
              borderBottom: "1px solid black",
              color: "black",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
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

function EnhancedTableToolbar({}) {
  return (
    <Toolbar sx={{ pl: 2, pr: 1 }}>
      <Typography
        sx={{
          flex: "1 1 100%",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "black",
        }}
        variant="h6"
        component="div"
      >
        PG Property List
      </Typography>
      {/* <Tooltip title="Filter list"><IconButton><FilterListIcon /></IconButton></Tooltip> */}
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
  // const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const data = dashboardData[0].properties.map((obj, index) =>
      createData(index + 1, obj.propertyName, obj.location, obj.status)
    );
    setRows(data);
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
          backgroundColor: "#E0E1DD",
          color: "black",
          width: "100%",
          mb: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <EnhancedTableToolbar />
        <TableContainer sx={{ width: "70%", color: "black" }}>
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
                    color: "black",
                    borderBottom: "none", // Remove row separator
                    "&:hover": {
                      backgroundColor: "black", // Set background color to black on hover
                      color: "black", // Change text color to white on hover
                      "& .MuiTableCell-root": {
                        cursor: "pointer",
                        color: "white", // Ensure cell text is white on hover
                        backgroundColor: "#0D1B2A",
                      },
                    },
                  }}
                  onClick={() => {
                    setOpen(true);
                    setSelectPg(row.id);
                  }}
                >
                  <TableCell align="center" sx={{ color: "black" }}>
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "black" }}>
                    {row.location}
                  </TableCell>
                  {row.status == "Active" ? (
                    <TableCell align="center" style={{ color: "green" }}>
                      {row.status}
                    </TableCell>
                  ) : (
                    <TableCell align="center" style={{ color: "red" }}>
                      {row.status}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
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
        />
      </Paper>
    </Box>
  );
}
