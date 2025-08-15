import React from "react";

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 mb-2 bg-gray-100">
      {/* Logo */}
      <div className="flex-1 text-left">
        <h1 className="text-xl font-bold">PGNIX</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-2 text-center">
        <input
          type="text"
          placeholder="Search PGs..."
          className="px-2 py-1 border border-gray-300 rounded"
        />
        <button className="px-3 py-1 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 text-right space-x-4">
        <a href="/" className="hover:text-blue-500">Home</a>
        <a href="/list" className="hover:text-blue-500">List PG</a>
        <a href="/login" className="hover:text-blue-500">Login</a>
      </nav>
    </header>
  );
}

// PG Card Component (for reusability)
function PGCard({ pg }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition">
      <img
        src={pg.image}
        alt={pg.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{pg.name}</h2>
      <p className="text-gray-600">{pg.location}</p>
      <p className="text-gray-600">Rent: ₹{pg.rent}</p>
      <p
        className={`font-semibold ${
          pg.available ? "text-green-600" : "text-red-600"
        }`}
      >
        {pg.available ? "Available" : "Not Available"}
      </p>
      <button
        className="mt-4 px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
        onClick={() => alert(`Viewing details for ${pg.name}`)}
      >
        View
      </button>
    </div>
  );
}

// PG List Component
function PGList() {
  const pgData = [
    { id: 1, name: "Sunrise PG", location: "Noida Sector 125", rent: 8000, available: true, image: "https://picsum.photos/seed/1/300/200" },
    { id: 2, name: "Green View PG", location: "Noida Sector 62", rent: 9000, available: false, image: "https://picsum.photos/seed/2/300/200" },
    { id: 3, name: "Blue Nest PG", location: "Ghaziabad", rent: 7500, available: true, image: "https://picsum.photos/seed/3/300/200" },
    { id: 4, name: "City Comfort PG", location: "Delhi Laxmi Nagar", rent: 8500, available: true, image: "https://picsum.photos/seed/4/300/200" },
    { id: 5, name: "Metro Stay PG", location: "Delhi Rajouri Garden", rent: 9200, available: false, image: "https://picsum.photos/seed/5/300/200" },
    { id: 6, name: "Urban Nest PG", location: "Noida Sector 15", rent: 7800, available: true, image: "https://picsum.photos/seed/6/300/200" },
    { id: 7, name: "Park View PG", location: "Ghaziabad Indirapuram", rent: 8100, available: true, image: "https://picsum.photos/seed/7/300/200" },
    { id: 8, name: "Elite Stay PG", location: "Delhi Karol Bagh", rent: 9700, available: false, image: "https://picsum.photos/seed/8/300/200" },
    { id: 9, name: "Happy Homes PG", location: "Noida Sector 18", rent: 8300, available: true, image: "https://picsum.photos/seed/9/300/200" },
    { id: 10, name: "Silver Stay PG", location: "Ghaziabad Vaishali", rent: 7600, available: true, image: "https://picsum.photos/seed/10/300/200" },
    { id: 11, name: "Dream Nest PG", location: "Delhi Connaught Place", rent: 9900, available: false, image: "https://picsum.photos/seed/11/300/200" },
    { id: 12, name: "Bright Stay PG", location: "Noida Sector 63", rent: 8400, available: true, image: "https://picsum.photos/seed/12/300/200" },
    { id: 13, name: "River View PG", location: "Delhi Dwarka", rent: 9100, available: true, image: "https://picsum.photos/seed/13/300/200" },
    { id: 14, name: "Luxury Nest PG", location: "Noida Sector 137", rent: 9500, available: false, image: "https://picsum.photos/seed/14/300/200" },
    { id: 15, name: "Budget Stay PG", location: "Ghaziabad Vasundhara", rent: 7000, available: true, image: "https://picsum.photos/seed/15/300/200" },
    { id: 16, name: "Golden View PG", location: "Delhi Pitampura", rent: 8800, available: true, image: "https://picsum.photos/seed/16/300/200" },
    { id: 17, name: "City Hub PG", location: "Noida Sector 44", rent: 7700, available: false, image: "https://picsum.photos/seed/17/300/200" },
    { id: 18, name: "Peace Stay PG", location: "Delhi Saket", rent: 8600, available: true, image: "https://picsum.photos/seed/18/300/200" },
    { id: 19, name: "Skyline PG", location: "Ghaziabad Kaushambi", rent: 7300, available: true, image: "https://picsum.photos/seed/19/300/200" },
    { id: 20, name: "Cosy Corner PG", location: "Delhi Hauz Khas", rent: 9400, available: false, image: "https://picsum.photos/seed/20/300/200" },
    { id: 21, name: "Bright Nest PG", location: "Noida Sector 120", rent: 8100, available: true, image: "https://picsum.photos/seed/21/300/200" },
    { id: 22, name: "Happy Stay PG", location: "Delhi Vasant Kunj", rent: 9700, available: true, image: "https://picsum.photos/seed/22/300/200" },
    { id: 23, name: "Safe Stay PG", location: "Noida Sector 76", rent: 7800, available: false, image: "https://picsum.photos/seed/23/300/200" },
    { id: 24, name: "Green Nest PG", location: "Ghaziabad Mohan Nagar", rent: 7500, available: true, image: "https://picsum.photos/seed/24/300/200" },
    { id: 25, name: "Urban Comfort PG", location: "Delhi Rohini", rent: 8900, available: true, image: "https://picsum.photos/seed/25/300/200" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
