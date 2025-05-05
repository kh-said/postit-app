import { Navbar, Nav, NavItem } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link } from "react-router-dom";
import {logout} from '../Features/UserSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async()=>{
    dispatch(logout())
    await new Promise((resolve) => setTimeout(resolve, 100)); 
    navigate("/login")
  }

  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={logo} className="logo" alt=""/>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handleLogout}>Logout</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
