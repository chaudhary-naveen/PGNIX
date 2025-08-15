import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Button,
} from '@mui/material';

const PgEditPage = ({ pg }) => {
  const [newData, setNewData] = useState({});

  // Initialize form data when component mounts or pg changes
  useEffect(() => {
    setNewData(pg);
  }, [pg]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;

    setNewData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setNewData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Edited PG Data:", newData);
    // You can send newData to an API or update state here
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: '50vw', maxWidth: '100%' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Edit {pg?.propertyName} Details
          </h5>
          <button
            type="button"
            className="btn-close"
            style={{ fontSize: '20px' }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body flex justify-center">
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '70%' }}
          >
            <TextField
              name="propertyName"
              label="PG Name"
              value={newData?.propertyName || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="location"
              label="Location"
              value={newData?.location || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="status"
              label="Status"
              select
              value={newData?.status || ''}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <TextField
              name="rent"
              label="Rent (₹)"
              type="number"
              value={newData?.rent || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="securityMoney"
              label="Security Money (₹)"
              type="number"
              value={newData?.securityMoney || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="totalTenants"
              label="Total Tenants"
              type="number"
              value={newData?.totalTenants || ''}
              onChange={handleChange}
              fullWidth
            />

            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={!!newData?.isCoed}
                    onChange={handleSwitchChange}
                    name="isCoed"
                    color="primary"
                  />
                }
                label="Co-ed PG"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={!!newData?.isFurninshed}
                    onChange={handleSwitchChange}
                    name="isFurninshed"
                    color="primary"
                  />
                }
                label="Furnished"
              />
            </FormGroup>

            <TextField
              name="totalGirls"
              label="Total Girls"
              type="number"
              value={newData?.totalGirls || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="totalBoys"
              label="Total Boys"
              type="number"
              value={newData?.totalBoys || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="totalRooms"
              label="Total Rooms"
              type="number"
              value={newData?.totalRooms || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="ac_rooms"
              label="AC Rooms"
              type="number"
              value={newData?.ac_rooms || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="non_acRooms"
              label="Non-AC Rooms"
              type="number"
              value={newData?.non_acRooms || ''}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="description"
              label="Description"
              value={newData?.description || ''}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />

            <Button variant="contained" fullWidth type="submit" data-bs-dismiss="offcanvas"
            aria-label="Close">
              Submit
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default PgEditPage;
