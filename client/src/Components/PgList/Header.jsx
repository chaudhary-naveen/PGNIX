



function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-1  bg-gray-100">
      {/* Logo */}
      <div className="flex-1 text-left">
       
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
      {/* <nav className="flex-1 text-right space-x-4">
        <a href="/" className="hover:text-blue-500">Home</a>
        <a href="/list" className="hover:text-blue-500">List PG</a>
        <a href="/login" className="hover:text-blue-500">Login</a>
      </nav> */}
    </header>
  );
}

export default Header