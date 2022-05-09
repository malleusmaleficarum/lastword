import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/authRedux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import axios from "../misc/axios";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = ({ other, profileChanged }) => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [showDd, setShowDd] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const dropDownRef = useRef();
  window.onscroll = () => {
    setScrolled(window.scrollY > 20 ? true : false);

    //clean up
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropDownRef.current !== null &&
        !dropDownRef.current.contains(e.target)
      ) {
        setShowDd(!showDd);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (showDd) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [showDd]);

  //turnoff scroll Y if hamburger active
  useEffect(() => {
    if (hamburger) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "unset");
  }, [hamburger]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/${user}`);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) getUser();
  }, [user, profileChanged]);

  const handleLogout = async () => {
    try {
      const res = await axios.post("/auth/logout");
      dispatch(LOGOUT());
      localStorage.clear();
      if (res) return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container scrolled={scrolled} other={other}>
        <Wrapper>
          <LeftPart>
            <Link to='/' style={{ textDecoration: "none" }}>
              <Logo src={logo} alt='logo' />
            </Link>
          </LeftPart>
          <MiddlePart>
            <List>
              <StyledLink to='/'>
                <ListItem> Home</ListItem>
              </StyledLink>
              <StyledLink to='/letters'>
                <ListItem> Letters</ListItem>
              </StyledLink>
              <ListItem> About</ListItem>
            </List>
          </MiddlePart>
          <RightPart>
            {user ? (
              <>
                <MenuItem to='/write'>Write</MenuItem>
                <Avatar onClick={() => setShowDd(!showDd)}>
                  <ProfilePict
                    src={
                      !userData.image
                        ? "https://firebasestorage.googleapis.com/v0/b/lastword-849c6.appspot.com/o/user_profile_pict%2F1651779500534blank%20profile.webp?alt=media&token=631f959a-d622-4937-bd07-5a1a43e5392a"
                        : userData.image
                    }
                  />
                </Avatar>
                <DropDown ref={dropDownRef} showDd={showDd}>
                  <ul>
                    <li style={{ borderBottom: "1px solid lightgray" }}>
                      <StyledLink to={`/profile/${user}`}>
                        <span>Profile</span>
                      </StyledLink>
                    </li>
                    <li onClick={handleLogout}>
                      <span>Logout</span>
                    </li>
                  </ul>
                </DropDown>
              </>
            ) : (
              <>
                <MenuItem to='/login'>Login</MenuItem>
                <StyledLink to='/register'>
                  <Button>Register</Button>
                </StyledLink>
              </>
            )}
          </RightPart>
          <RightPartHamburger onClick={() => setHamburger(!hamburger)}>
            {hamburger ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
          </RightPartHamburger>
        </Wrapper>
        <HamburgerMenu hamburger={hamburger} handleLogout={handleLogout} />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  background: ${(props) =>
    props.scrolled
      ? "black"
      : "linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.2) 40%)"};
  font-size: 14px;
  background-color: ${(props) => (props.other ? "#333333" : "none")};
  position: fixed;
  color: white;
  z-index: 50;
  transition: background 0.5s ease;
`;

const Wrapper = styled.div`
  height: 70px;
  display: flex;
  padding: 0px 50px;
  align-items: center;
  justify-content: center;
`;

const LeftPart = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  height: 20px;
  cursor: pointer;
`;

const MiddlePart = styled.div`
  flex: 3;

  @media only screen and (max-width: 820px) {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
`;

const ListItem = styled.li`
  margin-right: 40px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

const RightPart = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 820px) {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  color: white;
  margin-right: 40px;
  cursor: pointer;
  text-decoration: none;

  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    opacity: 70%;
  }
`;

const Avatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 30px;
  background-color: lightgrey;
  cursor: pointer;
`;

const ProfilePict = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const DropDown = styled.div`
  background-color: white;
  position: absolute;
  border-radius: 10px;
  width: 130px;
  top: 45px;
  right: 40px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  visibility: ${(props) => (props.showDd ? "visible" : "hidden")};
  opacity: ${(props) => (props.showDd ? "1" : "0")};
  transform: ${(props) =>
    props.showDd ? "translateY(0px)" : "translateY(-10px)"};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;

  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    cursor: pointer;
  }

  span {
    text-decoration: none;
    color: #333333;
    padding: 10px 15px;
    display: block;
    :hover {
      opacity: 0.6;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  color: white;
  outline: none;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

const RightPartHamburger = styled.div`
  display: none;
  cursor: pointer;
  position: relative;

  @media only screen and (max-width: 820px) {
    display: block;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default Navbar;
