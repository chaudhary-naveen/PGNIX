import Card from "@mui/material/Card";
import OwnerNameSection from "./OwnerNameSection";
import MainContent from "./MainContent";
import { useEffect, useState } from "react";
import ParticularPgPage from "./ParticularPg/ParticularPgPage";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import path from './../../path';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const ownerData = useSelector((state) => state.user.user);
  const [selectPg, setSelectPg] = useState("");
  const token = useSelector(state => state.user.token);
  const [ownerPGs,setOwnerPGs] = useState();

  const fetchPgs = async ()=>{
    try{
      const response = await axios.get(`${path}/api/v1/pg/all`,{
        params : {
          id : ownerData._id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if(response.status === 200){
        setOwnerPGs(response.data);
      }else{
        console.log("Error fetching properties");
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchPgs();
  },[]);

  return (
    <div className="container ">
      {/* Dashboard Top Name section */}
      <OwnerNameSection ownerName={ownerData?.firstname} />
      {
        <Box>
          {open ? (
            <ParticularPgPage
              dashboardData={ownerPGs}
              selectPg={selectPg}
              setOpen={setOpen}
              open={open}
            />
          ) : null}
        </Box>
      }
      <MainContent
        dashboardData={ownerPGs}
        setSelectPg={setSelectPg}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Dashboard;
