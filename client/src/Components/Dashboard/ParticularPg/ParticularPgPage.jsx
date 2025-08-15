import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Card,
} from "@mui/material";
import PgEditPage from "./PgEditPage";

const ParticularPgPage = ({ dashboardData, selectPg, setOpen, open }) => {
  const [pg, setPg] = React.useState({});

  React.useEffect(() => {
    if (dashboardData?.[0]?.properties) {
      const selected = dashboardData[0].properties.find(
        (obj) => obj.id == selectPg
      );
      if (selected) {
        setPg(selected);
      }
    }
  }, [selectPg, dashboardData]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="pg-dialog-title"
      aria-describedby="pg-dialog-description"
      sx={{ width: "100%" }}
      fullWidth
    >
      <DialogTitle
        id="pg-dialog-title"
        sx={{
          fontSize: "2rem",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {pg?.propertyName || "PG Details"}{" "}
          <span>
            <Chip label={pg?.isCoed ? "Co-ed PG" : "No Co-ed PG"} />
          </span>
        </div>
        {/* <div>
          <a
            class="btn "
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <Button variant="outlined" color="error" pg={pg}>
              Edit
            </Button>
          </a>
          <PgEditPage pg={pg} />
        </div> */}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="pg-dialog-description">
          <div className="conatiner-fluid">
            <div className="row">
              <div className="col-6">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>{pg?.status}</td>
                    </tr>

                    <tr>
                      <td>Location</td>
                      <td>{pg?.location}</td>
                    </tr>

                    <tr>
                      <td>isFurninshed</td>
                      <td>
                        {pg?.isFurninshed ? "Full furninshed" : "Unfurnished"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                  elevation={3}
                >
                  <h6>Expenses</h6>
                  <div className="w-full">
                    <div className="flex justify-around">
                      <div className="flex justify-start  w-[50%] text-center">
                        Rent
                      </div>
                      <div>{pg?.rent}</div>
                    </div>

                    <div className="flex justify-around">
                      <div className="flex justify-start  w-[50%] text-center">
                        Security-Money
                      </div>
                      <div>{pg?.securityMoney}</div>
                    </div>
                    <hr />
                    <div className="flex justify-around">
                      <div className="flex justify-start  w-[50%] text-center">
                        Total
                      </div>
                      <div>{pg?.securityMoney || 0 + pg?.rent || 0}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <hr className="mt-4" />

            <div className="row">
              <div className="col-6">
                <Card sx={{ padding: "10px 20px" }}>
                  <p>Total Peoples: {pg?.totalTenants}</p>
                  <hr />

                  <div>
                    <p>Total Boys {pg?.totalBoys}</p>
                    <p>Total Girls {pg?.totalGirls}</p>
                  </div>
                </Card>
              </div>

              <div className="col-6">
                <Card sx={{ padding: "10px 20px" }}>
                  <h5>Total Rooms: {pg?.totalRooms}</h5>
                  <hr />
                  <p>Total Ac Rooms: {pg?.ac_rooms}</p>
                  <p>Total Non Rooms: {pg?.non_acRooms}</p>
                </Card>
              </div>
            </div>
            <hr className="mt-4" />

            <div className="col">
              <Card sx={{ padding: "20px 30px" }}>
                <div className="font-bold">Discription</div>
                <div>{pg?.description}</div>
              </Card>
            </div>
          </div>

          {/* Add more fields as needed */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticularPgPage;
