import React from "react";
import { useNavigate } from "react-router-dom";

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-[#0D1B2A] text-[#E0E1DD]">
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
        <h2 className="text-l font-semibold text-[#E0E1DD] mb-1">{pg.name}</h2>
        <p className="text-[#AEB6BF]">{pg.location}</p>
        <p className="text-[#AEB6BF]">Rent: ₹{pg.rent}</p>
        <p
          className={`font-semibold ${
            pg.available ? "text-green-400" : "text-red-400"
          }`}
        >
          {pg.available ? "Available" : "Not Available"}
        </p>
      </div>
      <button
        className="px-4 py-2 rounded-xl text-[#0D1B2A] bg-[#E0E1DD] hover:bg-[#C6C7C4] transition-colors rounded"
        onClick={() => navigate('/product')}
      >
        View Property
      </button>
    </div>
  );
}
// ...existing code...

// PG List Component
function PGList() {
  const pgData = [
  { id: 1, name: "Sunrise Residency PG", location: "Noida Sector 125, Gautam Budh Nagar, Uttar Pradesh - 201313", rent: "₹7,800 - ₹8,200", available: true, image: "https://picsum.photos/seed/1/300/200" },
  { id: 2, name: "Green View Comfort PG", location: "Noida Sector 62, Gautam Budh Nagar, Uttar Pradesh - 201309", rent: "₹8,800 - ₹9,200", available: false, image: "https://picsum.photos/seed/2/300/200" },
  { id: 3, name: "Blue Nest Premium PG", location: "Ghaziabad, Kavi Nagar, Uttar Pradesh - 201002", rent: "₹7,300 - ₹7,700", available: true, image: "https://picsum.photos/seed/3/300/200" },
  { id: 4, name: "City Comfort Stay PG", location: "Laxmi Nagar, Delhi - 110092", rent: "₹8,300 - ₹8,700", available: true, image: "https://picsum.photos/seed/4/300/200" },
  { id: 5, name: "Metro Stay Luxury PG", location: "Rajouri Garden, Delhi - 110027", rent: "₹9,000 - ₹9,400", available: false, image: "https://picsum.photos/seed/5/300/200" },
  { id: 6, name: "Urban Nest Co-Living PG", location: "Noida Sector 15, Uttar Pradesh - 201301", rent: "₹7,600 - ₹8,000", available: true, image: "https://picsum.photos/seed/6/300/200" },
  { id: 7, name: "Park View Homely PG", location: "Indirapuram, Ghaziabad, Uttar Pradesh - 201014", rent: "₹7,900 - ₹8,300", available: true, image: "https://picsum.photos/seed/7/300/200" },
  { id: 8, name: "Elite Stay Executive PG", location: "Karol Bagh, Delhi - 110005", rent: "₹9,500 - ₹9,900", available: false, image: "https://picsum.photos/seed/8/300/200" },
  { id: 9, name: "Happy Homes Premium PG", location: "Noida Sector 18, Uttar Pradesh - 201301", rent: "₹8,100 - ₹8,500", available: true, image: "https://picsum.photos/seed/9/300/200" },
  { id: 10, name: "Silver Stay Comfort PG", location: "Vaishali, Ghaziabad, Uttar Pradesh - 201019", rent: "₹7,400 - ₹7,800", available: true, image: "https://picsum.photos/seed/10/300/200" },
  { id: 11, name: "Dream Nest Executive PG", location: "Connaught Place, Delhi - 110001", rent: "₹9,500 - ₹10,300", available: false, image: "https://picsum.photos/seed/11/300/200" },
  { id: 12, name: "Bright Stay Deluxe PG", location: "Noida Sector 63, Uttar Pradesh - 201301", rent: "₹8,200 - ₹8,600", available: true, image: "https://picsum.photos/seed/12/300/200" },
  { id: 13, name: "River View Prime PG", location: "Dwarka Sector 6, Delhi - 110075", rent: "₹8,800 - ₹9,400", available: true, image: "https://picsum.photos/seed/13/300/200" },
  { id: 14, name: "Luxury Nest Suites PG", location: "Noida Sector 137, Uttar Pradesh - 201305", rent: "₹9,300 - ₹9,700", available: false, image: "https://picsum.photos/seed/14/300/200" },
  { id: 15, name: "Budget Stay Affordable PG", location: "Vasundhara, Ghaziabad, Uttar Pradesh - 201012", rent: "₹6,800 - ₹7,200", available: true, image: "https://picsum.photos/seed/15/300/200" },
  { id: 16, name: "Golden View Prime PG", location: "Pitampura, Delhi - 110034", rent: "₹8,600 - ₹9,000", available: true, image: "https://picsum.photos/seed/16/300/200" },
  { id: 17, name: "City Hub Premium PG", location: "Noida Sector 44, Uttar Pradesh - 201303", rent: "₹7,500 - ₹7,900", available: false, image: "https://picsum.photos/seed/17/300/200" },
  { id: 18, name: "Peace Stay Serene PG", location: "Saket, Delhi - 110017", rent: "₹8,400 - ₹8,800", available: true, image: "https://picsum.photos/seed/18/300/200" },
  { id: 19, name: "Skyline Comfort PG", location: "Kaushambi, Ghaziabad, Uttar Pradesh - 201012", rent: "₹7,100 - ₹7,500", available: true, image: "https://picsum.photos/seed/19/300/200" },
  { id: 20, name: "Cosy Corner Elite PG", location: "Hauz Khas, Delhi - 110016", rent: "₹9,200 - ₹9,600", available: false, image: "https://picsum.photos/seed/20/300/200" },
  { id: 21, name: "Bright Nest Homestay PG", location: "Noida Sector 120, Uttar Pradesh - 201301", rent: "₹7,900 - ₹8,300", available: true, image: "https://picsum.photos/seed/21/300/200" },
  { id: 22, name: "Happy Stay Executive PG", location: "Vasant Kunj, Delhi - 110070", rent: "₹9,300 - ₹9,900", available: true, image: "https://picsum.photos/seed/22/300/200" },
  { id: 23, name: "Safe Stay Co-Living PG", location: "Noida Sector 76, Uttar Pradesh - 201306", rent: "₹7,600 - ₹8,000", available: false, image: "https://picsum.photos/seed/23/300/200" },
  { id: 24, name: "Green Nest Comfort PG", location: "Mohan Nagar, Ghaziabad, Uttar Pradesh - 201007", rent: "₹7,300 - ₹7,700", available: true, image: "https://picsum.photos/seed/24/300/200" },
  { id: 25, name: "Urban Comfort Elite PG", location: "Rohini Sector 8, Delhi - 110085", rent: "₹8,500 - ₹9,300", available: true, image: "https://picsum.photos/seed/25/300/200" },
];


  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#0D1B2A]">
      {pgData.map((pg) => (
        <PGCard key={pg.id} pg={pg} />
      ))}
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
