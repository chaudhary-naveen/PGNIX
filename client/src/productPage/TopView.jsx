import React from 'react'
import TopImageContainer from './TopImageContainer'
import TopviewDesc from './TopviewDesc'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

const aboutData = [
  {
    Pg_name:"Genz Pg",
    Pg_owner:"Alok Maurya",
    location:{
      local_address:"sector 44 , gali no 3",
      city:"NOIDA",
      state:"Uttar Pradesh",
      country:"India"
    },
    owner_contact_number:"996745239",
    type:"Fully Furnished",
    Pg_description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
    prime_location:["Lal Bahadur shastri Airport", "New Delhi Railway station", "local Park"],

    


  }
]

const TopView = () => {
  return (
    <div className='container'>
        <div className="row" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {/* image section */}
            <div className="col">
              <TopImageContainer/>
            </div>
            {/* product description */}
            {/* <div className="col-4">
                <TopviewDesc/>
            </div> */}
        </div>
        <div className="row mt-4">
          <div className="col " >
             <Card elevation={10} sx={{display:"flex", justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"20px" , padding:"20px"}}>
              <div>
                <Typography component="h2" variant='h5'>About PG</Typography>
              </div>
              <Box sx={{width:"80%"}}>
                  <table class="table">
                    
                    <tbody >
                      <tr className="mb-4">
                        <td className='w-[20%]'>PG Name</td>
                        <td>{aboutData[0].Pg_name}</td>
                      </tr>
                      <tr>
                        <td>PG Owner</td>
                        <td>{aboutData[0].Pg_owner}</td>
                      </tr>
                    
                      <tr>
                        <td>Contact Number</td>
                        <td>{aboutData[0].owner_contact_number}</td>
                      </tr>
                      <tr>
                        <td>Property Type</td>
                        <td>{aboutData[0].type}</td>
                      </tr>
                       <tr>
                        <td>Description</td>
                        <td>{aboutData[0].Pg_description}</td>
                      </tr>
                       
                       <tr>
                        <td> Address</td>
                        <td>{`${aboutData[0].location.local_address} , ${aboutData[0].location.city}, ${aboutData[0].location.state}`}</td>
                      </tr>


                       <tr>
                        <td> Prime Locations</td>
                        <td>
                          {
                            aboutData[0].prime_location.map((value)=>{
                              return <Chip label={`${value}`}/>
                            })
                          }
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

export default TopView