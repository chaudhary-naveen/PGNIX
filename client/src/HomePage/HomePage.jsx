import axios from "axios";
import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import path from './../path';
import PropertyCardSkeleton from "./PropertyCardSkeleton";

// Header Component
function Header() {
  return (
    <header className="flex flex-col items-center justify-between px-5 py-3 bg-[#0D1B2A] text-[#E0E1DD]">
      <div className="flex-2 text-center">
        <input
          type="text"
          placeholder="Search PGs..."
          className="px-2 py-1 border border-gray-300 rounded text-[#E0E1DD] bg-[#1B263B] focus:outline-none focus:border-blue-500 mx-2 w-full sm:w-64"
        />
        <button className="px-3 py-1 ml-2 text-[#1B263B] bg-[#E0E1DD] rounded hover:bg-[#E0E1DF] transition-colors">
          Search Properties
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Showing Properties in Sector 62, Noida</h1>
        <p className="text-sm text-gray-400">Filters : Bachelor, Male, Parking</p>
      </div>
    </header>
  );
}

// PG Card Component (for reusability)
// ...existing code...
function PGCard({ pg }){
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#1B263B] rounded-2xl shadow p-4 border border-[#415A77] hover:shadow-lg transition items-center space-x-6">
      <img
        src={pg.image}
        alt={pg.name}
        className="w-36 h-28 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1">
        <h2 className="text-l font-semibold text-[#E0E1DD] ">{pg.propertyName}</h2>
        <p className="text-[#AEB6BF]">{pg.location}</p>
        <p className="text-[#AEB6BF]">Rent: ₹{pg.rent}</p>
        <p className="text-[#AEB6BF]">Security: ₹{pg.security_money}</p>
        {/* <p className="text-[#AEB6BF]">Security: ₹{pg.security_money}</p> */}
        <p className="text-[#AEB6BF]">Furnishing: {pg.isFurnished ? "Full Furnishing" : "No Furnishing"}</p>
        <p className={`font-semibold text-[#AEB6BF]`}>
          {pg.co_ed ? "Co - Living" : "Single Type"}
        </p>
      </div>
      <button
        className="px-4 py-2 rounded-xl text-[#0D1B2A] bg-[#E0E1DD] hover:bg-[#C6C7C4] transition-colors rounded"
        onClick={() => navigate(`/product?id=${pg._id}`)}
      >
        View Property
      </button>
    </div>
  );
}
// ...existing code...

// PG List Component
function PGList() {
  const [pgData,setPgData] = useState([]);
  const fetchPgs = async ()=>{
    try{
      const response_from_server = await axios.get(`${path}/api/v1/pg/filter`);
      if(response_from_server.status == 200){
        setPgData(response_from_server.data.properties)
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    setTimeout(() => {
      fetchPgs();
    }, 1000);
  },[]);

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#0D1B2A]">
      {pgData.length > 0 ?  pgData.map((pg) => (
        <PGCard key={pg.id} pg={pg} />
      ))  : <>
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />

      </>
      }
    </div>
  );
}

// Home Page
export default function Home() {
  return (
    <div>
      <Header />
      <PGList />
    </div>
  );
}
