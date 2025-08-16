import Card from "@mui/material/Card";
import OwnerNameSection from "./OwnerNameSection"
import MainContent from "./MainContent";
import { useState } from "react";
import ParticularPgPage from "./ParticularPg/ParticularPgPage";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const dashboardData = [
  {
    ownerName: "Ashu", 
    properties: [
      { id:"1",
        propertyName: "Ashu PG Residency",
        location: "Delhi",
        status: "Active",
        rent: 8000,
        totalTenants: 12,
        isCoed: false,
        totalGirls: 12,
        totalBoys: 0,
        totalRooms: 6,
        ac_rooms: 4,
        non_acRooms: 2,
        description: "Girls PG near metro station with all basic amenities.",
        isFurninshed: true,
        securityMoney: 5000
      },
      {
        id:"2",
        propertyName: "Sunrise Stay",
        location: "Bangalore",
        status: "Active",
        rent: 9500,
        totalTenants: 10,
        isCoed: true,
        totalGirls: 4,
        totalBoys: 6,
        totalRooms: 5,
        ac_rooms: 3,
        non_acRooms: 2,
        description: "Fully furnished co-ed PG with fast WiFi and laundry.",
        isFurninshed: true,
        securityMoney: 6000
      },
      {
        id:"3",
        propertyName: "Maple Heights",
        location: "Pune",
        status: "Inactive",
        rent: 7000,
        totalTenants: 0,
        isCoed: false,
        totalGirls: 0,
        totalBoys: 0,
        totalRooms: 8,
        ac_rooms: 2,
        non_acRooms: 6,
        description: "Budget PG for students with spacious rooms.",
        isFurninshed: false,
        securityMoney: 3000
      },
      {
        id:"4",
        propertyName: "Urban Nest",
        location: "Hyderabad",
        status: "Active",
        rent: 10000,
        totalTenants: 14,
        isCoed: true,
        totalGirls: 7,
        totalBoys: 7,
        totalRooms: 7,
        ac_rooms: 5,
        non_acRooms: 2,
        description: "Premium co-ed PG with gym and common kitchen.",
        isFurninshed: true,
        securityMoney: 7000
      },
      {
        id:"5",
        propertyName: "Comfort Inn PG",
        location: "Noida",
        status: "Active",
        rent: 8500,
        totalTenants: 9,
        isCoed: false,
        totalGirls: 0,
        totalBoys: 9,
        totalRooms: 5,
        ac_rooms: 3,
        non_acRooms: 2,
        description: "Spacious boys PG with 24x7 security and meals.",
        isFurninshed: true,
        securityMoney: 4000
      },
      {
        id:"6",
        propertyName: "Blue Sky Hostel",
        location: "Chandigarh",
        status: "Inactive",
        rent: 6500,
        totalTenants: 0,
        isCoed: false,
        totalGirls: 0,
        totalBoys: 0,
        totalRooms: 6,
        ac_rooms: 1,
        non_acRooms: 5,
        description: "Affordable PG for boys with mess and WiFi.",
        isFurninshed: false,
        securityMoney: 3500
      },
      {
        id:"7",
        propertyName: "Happy Stay",
        location: "Gurgaon",
        status: "Active",
        rent: 11000,
        totalTenants: 8,
        isCoed: false,
        totalGirls: 8,
        totalBoys: 0,
        totalRooms: 4,
        ac_rooms: 4,
        non_acRooms: 0,
        description: "Girls-only PG near offices with AC in all rooms.",
        isFurninshed: true,
        securityMoney: 8000
      },
      {
        id:"8",
        propertyName: "Elite PG Homes",
        location: "Ahmedabad",
        status: "Active",
        rent: 7500,
        totalTenants: 11,
        isCoed: true,
        totalGirls: 5,
        totalBoys: 6,
        totalRooms: 6,
        ac_rooms: 2,
        non_acRooms: 4,
        description: "Well-maintained co-ed PG in a safe locality.",
        isFurninshed: true,
        securityMoney: 5000
      },
      {
        id:"9",
        propertyName: "Green View PG",
        location: "Kolkata",
        status: "Inactive",
        rent: 7200,
        totalTenants: 0,
        isCoed: false,
        totalGirls: 0,
        totalBoys: 0,
        totalRooms: 7,
        ac_rooms: 3,
        non_acRooms: 4,
        description: "Under renovation. Will reopen next month.",
        isFurninshed: false,
        securityMoney: 4000
      },
      {
        id:"10",
        propertyName: "Metro Living",
        location: "Mumbai",
        status: "Active",
        rent: 12000,
        totalTenants: 15,
        isCoed: true,
        totalGirls: 6,
        totalBoys: 9,
        totalRooms: 8,
        ac_rooms: 5,
        non_acRooms: 3,
        description: "Luxurious co-ed PG close to railway station.",
        isFurninshed: true,
        securityMoney: 10000
      }
    ]
  }
];

const Dashboard = ()=>{
    const [open,setOpen] = useState(false)
    const ownerData = useSelector(state => state.user.user);
    const [selectPg,setSelectPg] = useState("")
    
    return <div className="container ">
      {/* Dashboard Top Name section */}
      <OwnerNameSection ownerName = {ownerData?.firstname}/>
      {
        <Box>
                {
                    open ? <ParticularPgPage  dashboardData={dashboardData} selectPg={selectPg} setOpen={setOpen} open={open}/>:null
                }
            </Box>
      }
      <MainContent dashboardData = {dashboardData } setSelectPg={setSelectPg} setOpen={setOpen}/>
    </div>
}

export default Dashboard