import './Navbar.css';
import logo from './../../assets/logo.jpeg'
const Navbar = ()=>{
    return <nav
  style={{
    backgroundColor: "white",
    width: "100%",
    zIndex: 20,
    top: 0,
    left: 0,
    borderBottom: "1px solid #e5e7eb" /* border-gray-200 */,
  }}
>
  <div
    style={{
      maxWidth: "1280px", // max-w-screen-xl
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0 auto",
      padding: "1rem",
    }}
  >
    <a
      href="/"
      style={{
        display: "flex",
        textDecoration:"none",
        alignItems: "center",
        gap: "0.75rem", // space-x-3
      }}
    >
      <img src={logo} style={{ height: "2rem" }} alt="logo" />
      <span
        style={{
          alignSelf: "center",
          fontSize: "1.5rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
          color: "black",
        }}
      >
        PG
        <span style={{ color: "#60a5fa" /* blue-400 */ }}>NIX</span>
      </span>
    </a>

    <div style={{ display: "flex", order: 2, gap: "0.75rem" }}>
      <a href="/login">
        <button
          type="button"
          style={{
            color: "white",
            backgroundColor: "#1d4ed8" /* blue-700 */,
            fontWeight: 500,
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            padding: "0.5rem 1rem",
            textAlign: "center",
            cursor: "pointer",
            border: "none",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
        >
          Signin
        </button>
      </a>

      <button
        type="button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem",
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "0.875rem",
          color: "#6b7280" /* text-gray-500 */,
          borderRadius: "0.5rem",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ position: "absolute", left: "-9999px" }}>
          Open main menu
        </span>
        <svg
          style={{ width: "1.25rem", height: "1.25rem" }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>

    <div
      id="navbar-sticky"
      style={{
        display: "none",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        order: 1,
      }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          marginTop: "1rem",
          fontWeight: 500,
          border: "1px solid #f3f4f6" /* border-gray-100 */,
          borderRadius: "0.5rem",
          backgroundColor: "#f9fafb" /* bg-gray-50 */,
        }}
      >
        <li>
          <a
            href="#"
            style={{
              display: "block",
              padding: "0.5rem 0.75rem",
              color: "white",
              backgroundColor: "#1d4ed8",
              borderRadius: "0.125rem",
              textDecoration: "none",
            }}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            style={{
              display: "block",
              padding: "0.5rem 0.75rem",
              color: "#111827" /* text-gray-900 */,
              borderRadius: "0.125rem",
              textDecoration: "none",
            }}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            style={{
              display: "block",
              padding: "0.5rem 0.75rem",
              color: "#111827",
              borderRadius: "0.125rem",
              textDecoration: "none",
            }}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#"
            style={{
              display: "block",
              padding: "0.5rem 0.75rem",
              color: "#111827",
              borderRadius: "0.125rem",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

;
}

export default Navbar;



