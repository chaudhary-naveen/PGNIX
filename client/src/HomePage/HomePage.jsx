import React from "react";

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-gray-100">
      
      {/* Logo on the left */}
      <div className="flex-1 text-left ">
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

// Home Page
export default function Home() {
  return (
    <div>
      <Header />
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
