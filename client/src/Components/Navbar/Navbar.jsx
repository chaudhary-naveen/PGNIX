import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from './../../assets/logo.jpeg'
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import {removeUser} from './../../utils/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import './Navbar.css';



const pages = ["Home","About","Contact","Service"];



const Navbar =()=>{
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if(setting=="Login"){
      navigate("/login")
    }
    else if (setting=="Sign up"){
      navigate("/welcome")
    }
  };
  return <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className='flex items-center gap-2 mx-8' onClick={()=>navigate('/')}>
            <Box sx={{borderRadius:"50%",overflow:'hidden'}}>
                <img src={logo} alt="" width={40}/>
            </Box>
           <div class="pgnix-logo" aria-label="pgnix logo"></div>
          </div>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              {/* <Button      
                sx={{ my: 2, color: 'white', display: 'block' }}
              > 
              Hi, 
              </Button> */}
           
          </Box>

          {
            user ? (
              <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar color='secondary' alt='N'>  
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem  onClick={ ()=>{ 
                localStorage.clear();
                window.reload();

              }}>
                  <Typography sx={{ textAlign: 'center' }}>Account</Typography>
              </MenuItem>

              <MenuItem  onClick={()=>{localstorage.clear()}}>
                  <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={()=>{
                dispatch(removeUser());
              }}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
           
            </Menu>
          </Box>
          
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PersonIcon />}
                onClick={() => navigate('/login')}
              >
                Login / Signup
              </Button>
            )
          }

          

        </Toolbar>
      </Container>
    </AppBar>
  </>
}

export default Navbar

































// import './Navbar.css';
// import logo from './../../assets/logo.jpeg'
// const Navbar = ()=>{
//     return <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
//   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//     <a
//       href="/"
//       className="flex items-center space-x-3 rtl:space-x-reverse"
//     >
//       <img
//         src={logo}
//         className="h-8"
//         alt="logo"
//       />
//       <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
//         PG
//         <span className='text-blue-400'>
//         NIX
//         </span>
//       </span>
//     </a>
//     <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        
//        <a href='/login'>
//       <button
//         type="button"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
//         >
//         Signin
//       </button>
//       </a>


//       <button
//         data-collapse-toggle="navbar-sticky"
//         type="button"
//         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
//         aria-controls="navbar-sticky"
//         aria-expanded="false"
//       >
//         <span className="sr-only">Open main menu</span>
//         <svg
//           className="w-5 h-5"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 17 14"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M1 1h15M1 7h15M1 13h15"
//           />
//         </svg>
//       </button>
//     </div>
//     <div
//       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//       id="navbar-sticky"
//     >
//       <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
//             aria-current="page"
//           >
//             Home
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
//           >
//             About
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
//           >
//             Services
//           </a>
//         </li>
//         <li>
//           <a
//             href="#"
//             className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
//           >
//             Contact
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>
// ;
// }

// export default Navbar;



