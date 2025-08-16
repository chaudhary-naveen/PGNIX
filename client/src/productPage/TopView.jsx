import React from 'react'
import TopImageContainer from './TopImageContainer'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const aboutData = [
  {
    Pg_name: "Genz Pg",
    Pg_owner: "Alok Maurya",
    location: {
      local_address: "sector 44 , gali no 3",
      city: "NOIDA",
      state: "Uttar Pradesh",
      country: "India"
    },
    owner_contact_number: "996745239",
    type: "Fully Furnished",
    Pg_description: "It is a long established fact that a reader will be distracted by the readable content...",
    prime_location: ["Lal Bahadur shastri Airport", "New Delhi Railway station", "local Park"],
  }
]

const TopView = ({data}) => {
  console.log(data);
  return (
    <div className='container'>
      <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* image section */}
        <div className="col">
          <TopImageContainer />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <Card
            elevation={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              borderRadius: "16px",
              bgcolor: "background.paper"
            }}
          >
            <Typography component="h2" variant='h5' color="primary.main">
              About PG
            </Typography>

            <Box sx={{ width: "80%" }}>
              <table
                style={{
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  border: "1px solid #415A77",
                  borderRadius: "12px",
                  overflow: "hidden",
                  width: "100%",
                  backgroundColor: "#1B263B", // theme background.paper
                  color: "#E0E1DD" // theme secondary.main
                }}
              >
                <tbody>
                  <tr>
                    <td style={cellStyle}>PG Name</td>
                    <td style={cellStyle}>{data?.propertyName}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>PG Owner</td>
                    <td style={cellStyle}>{data?.owner?.firstname} {data?.owner?.lastname}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Contact Number</td>
                    <td style={cellStyle}>{data?.owner?.phone}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Contact Number</td>
                    <td style={cellStyle}>{data?.owner?.email}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Property Type</td>
                    <td style={cellStyle}>{data?.typesOfRoom}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Description</td>
                    <td style={cellStyle}>{data?.description}</td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Address</td>
                    <td style={cellStyle}>
                      {`${data?.location}`}
                    </td>
                  </tr>
                  <tr>
                    <td style={cellStyle}>Prime Locations</td>
                    <td style={cellStyle}>
                      {aboutData[0].prime_location.map((value, i) => (
                        <Chip
                          key={i}
                          label={value}
                          sx={{
                            borderRadius: "12px",
                            bgcolor: "black",
                            color: "white",
                            mr: 1,
                            mb: 1
                          }}
                        />
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Card>
        </div>
      </div>
    </div>
  )
}

const cellStyle = {
  border: "1px solid #415A77",
  padding: "10px",
  verticalAlign: "top",
  color: "#E0E1DD", // theme secondary.main
  backgroundColor: "#1B263B" // theme background.paper
}

export default TopView
