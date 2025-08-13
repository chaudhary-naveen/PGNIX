import React from "react";
// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-gray-100">
      
      {/* Logo on the left */}
      <div className="flex-1 text-left">
        <h1 className="text-xl font-bold">PGNIX</h1>
      </div>

      {/* Search bar in the center */}
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

      {/* Navigation on the right */}
      <nav className="flex-1 text-right space-x-4">
        <a href="/" className="hover:text-blue-500">Home</a>
        <a href="/list" className="hover:text-blue-500">List PG</a>
        <a href="/login" className="hover:text-blue-500">Login</a>
      </nav>
    </header>
  );
}

// PG List Component (moved into the same file)
function PGList() {
  const pgData = [
    { id: 1, name: "Sunrise PG", location: "Bangalore", rent: 8000, available: true },
    { id: 2, name: "Green View PG", location: "Mumbai", rent: 9000, available: false },
    { id: 3, name: "Blue Nest PG", location: "Delhi", rent: 7500, available: true },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {pgData.map((pg) => (
        <div
          key={pg.id}
          className="bg-white rounded-lg shadow p-4 border hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{pg.name}</h2>
          <p className="text-gray-600"> {pg.location}</p>
          <p className="text-gray-600"> Rent: ₹{pg.rent}</p>
          <p
            className={`font-semibold ${
              pg.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {pg.available ? "Available" : "Not Available"}
          </p>
          <button
            className={`mt-4 px-4 py-2 rounded text-white ${
              pg.available
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!pg.available}
          >
            {pg.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
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





// import React from 'react';

// function Header() {
//     return (
//     <>
//        <header>
//             <div>
//                 <h3>PGNIX</h3>
//             </div>
//         </header>
//     </>
//     );
// }

// function Content() {
//     return (
//         <>
//         <div>
//             <h1> PGs for you</h1>
//             <p> Find the best PGs in your preferred locations</p>        
//         </div>

//         <div className='filter'>
//             <h3> Sort by Price </h3>
//             <select>
//                 <option value = "low"> Low to High </option>
//                 <option value = "high">High to Low</option>
//                 </select> 
//             <h3>Filter by Availability</h3>
//             <select>
//                 <option value = "available"> Available</option>
//                 <option value = "not-available"> Not Available</option>
//             </select>
//              </div>
//         </>
//     );
// }

// export default function HomePage() {
//     return (
//         <>
//             <Header />
//             <Content />
//         </>
//     );
// }

//export default HomePage;
// export default HomePage = ()=>{
//     return
//     ( <>
//         <Header/ >

//     </>);
// }
