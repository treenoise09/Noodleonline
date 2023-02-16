import React, { useState,useEffect } from "react";
import "./Header.css";
import Logo from "./img/Onlinenoodle-logos_transparent.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./stateprovider";
import { Modal } from "@mui/material";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const [province, setProvince] = useState("");

  useEffect(() => {if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProvince(data.address.state);
        })
        .catch((error) => console.log(error));
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}, []);

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={Logo} alt="" />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <div className="header_option" onClick={handleOpen}>
          <span className="header_optionLineOne">Hello Guest</span>
          <span className="header_optionLineTwo">Sign In</span>
          <Modal open={open} onClose={handleClose}>
            <div className="BD" tabindex={-1}>
              <div className="Card">
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                  <MDBTabs
                    pills
                    justify
                    className="mb-3 d-flex flex-row justify-content-between"
                  >
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => handleJustifyClick("tab1")}
                        active={justifyActive === "tab1"}
                      >
                        Login
                      </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                      <MDBTabsLink
                        onClick={() => handleJustifyClick("tab2")}
                        active={justifyActive === "tab2"}
                      >
                        Register
                      </MDBTabsLink>
                    </MDBTabsItem>
                  </MDBTabs>

                  <MDBTabsContent>
                    <MDBTabsPane show={justifyActive === "tab1"}>
                      <div className="text-center mb-3">
                        <p>Sign in with:</p>

                        <div
                          className="d-flex justify-content-between mx-auto"
                          style={{ width: "40%" }}
                        >
                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="facebook-f" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="twitter" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="google" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="github" size="sm" />
                          </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                      </div>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email address"
                        id="form1"
                        type="email"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="form2"
                        type="password"
                      />

                      <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox
                          name="flexCheck"
                          value=""
                          id="flexCheckDefault"
                          label="Remember me"
                        />
                        <a href="!#">Forgot password?</a>
                      </div>

                      <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                      <p className="text-center">
                        Not a member? <a href="#!">Register</a>
                      </p>
                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === "tab2"}>
                      <div className="text-center mb-3">
                        <p>Sign un with:</p>

                        <div
                          className="d-flex justify-content-between mx-auto"
                          style={{ width: "40%" }}
                        >
                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="facebook-f" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="twitter" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="google" size="sm" />
                          </MDBBtn>

                          <MDBBtn
                            tag="a"
                            color="none"
                            className="m-1"
                            style={{ color: "#1266f1" }}
                          >
                            <MDBIcon fab icon="github" size="sm" />
                          </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                      </div>

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Name"
                        id="form1"
                        type="text"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Username"
                        id="form1"
                        type="text"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        id="form1"
                        type="email"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="form1"
                        type="password"
                      />

                      <div className="d-flex justify-content-center mb-4">
                        <MDBCheckbox
                          name="flexCheck"
                          id="flexCheckDefault"
                          label="I have read and agree to the terms"
                        />
                      </div>

                      <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                    </MDBTabsPane>
                  </MDBTabsContent>
                </MDBContainer>
              </div>
            </div>
          </Modal>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Location{province}</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
