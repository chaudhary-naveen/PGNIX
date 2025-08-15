import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Box, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const AddNewPg = ({ open, setOpen }) => {
  const [formData, setFormData] = React.useState({
    propertyName: '',
    location: '',
    status: 'Active',
    rent: '',
    isCoed: false,
    totalRooms: '',
    acRooms: '',
    isFurnished: '',
    securityMoney: '',
    description: '',
  });

  const [error, setError] = React.useState('');
  const [securityError, setSecurityError] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user changes the input
    if (name === 'acRooms' || name === 'totalRooms') {
      setError('');
    }
    if (name === 'securityMoney') {
      setSecurityError('');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Check if AC rooms are greater than total rooms
    if (parseInt(formData.acRooms) > parseInt(formData.totalRooms)) {
      setError('AC Rooms cannot be greater than Total Rooms.');
      return;
    }

    // Validation: Check if security money is greater than rent
    if (parseInt(formData.securityMoney) > parseInt(formData.rent)) {
      setSecurityError('Security Money cannot be greater than Rent.');
      return;
    }

    // Check for required fields
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'acRooms') { // Allow AC Rooms to be empty
        setError(`${key.replace(/([A-Z])/g, ' $1')} is required.`);
        return;
      }
    }

    console.log('New PG Data:', formData);
    handleClose(); // Close the dialog after submission
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", fontSize: '2rem' }}>
          {"Create New Property"}
          <hr />
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: "10px 20px" }}>
              <TextField
                label="Property Name"
                name='propertyName'
                placeholder='Enter Property Name'
                fullWidth
                value={formData.propertyName}
                onChange={handleChange}
                required
                margin='normal'
                error={!formData.propertyName}
                helperText={!formData.propertyName ? 'Property Name is required.' : ''}
              />
              <TextField
                label="Location"
                name='location'
                margin='normal'
                placeholder='Enter Location'
                fullWidth
                value={formData.location}
                onChange={handleChange}
                required
                error={!formData.location}
                helperText={!formData.location ? 'Location is required.' : ''}
              />
              <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  margin='normal'
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="number"
                margin='normal'
                label="Rent (₹)"
                name='rent'
                placeholder='Enter Rent'
                fullWidth
                value={formData.rent}
                onChange={handleChange}
                required
                error={!formData.rent}
                helperText={!formData.rent ? 'Rent is required.' : ''}
              />
              <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
                <InputLabel>Co-ed PG</InputLabel>
                <Select
                  name="isCoed"
                  value={formData.isCoed ? 'true' : 'false'}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="number"
                margin='normal'
                label="Total Rooms"
                name='totalRooms'
                placeholder='Enter Total Rooms'
                fullWidth
                value={formData.totalRooms}
                onChange={handleChange}
                required
                error={!formData.totalRooms}
                helperText={!formData.totalRooms ? 'Total Rooms is required.' : ''}
              />
              <TextField
                type="number"
                margin='normal'
                label="AC Rooms"
                name='acRooms'
                placeholder='Enter AC Rooms'
                fullWidth
                value={formData.acRooms}
                onChange={handleChange}
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel>Furnishing</InputLabel>
                <Select
                  name="isFurnished"
                  margin='normal'
                  value={formData.isFurnished}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Furnished">Furnished</MenuItem>
                  <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin='normal'
                type="number"
                label="Security Money (₹)"
                name='securityMoney'
                placeholder='Enter Security Money'
                fullWidth
                value={formData.securityMoney}
                onChange={handleChange}
                error={!!securityError}
                helperText={securityError}
              />
              <TextField
                label="Description"
                name='description'
                margin='normal'
                placeholder='Enter a short description'
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          <Button onClick={handleSubmit} variant='contained'>
            Add Property
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewPg;
