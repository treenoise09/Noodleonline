import React, { useState, useEffect } from "react";
import './Header.css'
import Logo from './img/Onlinenoodle-logos_transparent.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./stateprovider";
import { Modal } from "react-bootstrap";
import { db, auth } from './firebase';
import OrderStatus from './status';
import Badge from '@mui/material/Badge';


function Header({ setSearch }) {
  const [{ basket, locationModalOpen }, dispatch] = useStateValue();
  const [pickupModalOpen, setPickupModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [pickupTime, setPickupTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: ''
  });


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [tel,setTel ] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log("authUser.uid: ", authUser.uid);
        const docRef = db.collection("Users").doc(authUser.uid);
        const doc = await docRef.get();
        if (doc.exists) {
          const userData = doc.data();
          setUser({
            ...authUser,
            name: userData.Name,
            tel: userData.Tel,
            role: userData.Role[0],
          });
          dispatch({  // dispatch action to update global user state
            type: 'SET_USER',
            user: {
              ...authUser,
              name: userData.Name,
              tel: userData.Tel,
              role: userData.Role[0],
            },
          });
        } else {
          console.log("No user data found in Firestore");
        }
      } else {
        setUser(null);
        dispatch({ // dispatch action to update global user state
          type: 'SET_USER',
          user: null,
        });
      }
    });
    const fetchOrdersData = async () => {
      try {
        const ordersSnapshot = await db.collection("Sale").where("status", "!=", "Done").get();
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setOrderCount(ordersData.length); // Set the order count
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    return () => {
      unsubscribe();
      fetchOrdersData();
    };
  }, []);
  const handleLocationSelection = (choice) => {
    dispatch({ type: 'SET_LOCATION_MODAL_OPEN', locationModalOpen: false });
    if (user.role === "Admin") {
      setAdminModalOpen(true);
    } else {
      if (choice === 'pickup') {
        setPickupModalOpen(true);
      } else {
        setDeliveryModalOpen(true);
      }
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  }
  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  }
  const signOut = () => {
    if (user) {
      auth.signOut();
    }
  };

  const register = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user) {
        const docRef = db.collection("Users").doc(user.uid);

        // Adding a new user document to Firestore
        await docRef.set({
          Role: ["User"],
          Username: email,
          Name: name,
          Tel: tel,
        });


        closeModal();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src={Logo} alt="" />
      </Link>
      <div className="searchLogo"><h3>ค้นหาเมนู -></h3></div>
      <div className="header_search">
        
        <input
          className="header_searchInput"
          type='text'
          onChange={(e) => setSearch(e.target.value)} //set search value
        />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <div className="header_option" onClick={() => { !user && openModal() }}>

          <span className="header_optionLineOne">
            Hello {user ? user.name : "Guest"}
          </span>

          <span className="header_optionLineTwo" onClick={signOut}>
            {user ? 'Sign Out' : 'Sign In'}
          </span>

        </div>

        <div className="header_option" onClick={() => {
          if (user?.role === "Admin") {
            setAdminModalOpen(true);
          } else {
            dispatch({ type: 'SET_LOCATION_MODAL_OPEN', locationModalOpen: true });
          }
        }}>
          {user?.role === "Admin" && (
        <Badge badgeContent={orderCount} color="primary">
          <span className="header_optionLineOne">Order</span>
        </Badge>
      )}
      {user?.role !== "Admin" && <span className="header_optionLineOne">Your</span>}
          <span className="header_optionLineTwo">
            {user?.role === "Admin" ? "Status" : "Shipping"}
          </span>
        </div>


        {
          user?.role === "Admin" ? (
            <Link to="/report">
              <div className="header_option">
                <span className="header_optionLineOne">
                  View
                </span>
                <span className="header_optionLineTwo">
                  Report
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/History">
              <div className="header_optionBasket">
                <ShoppingBasketIcon />
                <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
              </div>
            </Link>
          )
        }

      </div>

      <Modal
        show={modalIsOpen}
        onHide={closeModal}
      >
        <Modal.Body>
          {showLoginForm ? (
            <form>
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-grid">
                <button onClick={toggleForm}>Switch to Register</button>
              </div>
              <div className="d-grid">
                <button type="button" className="btn btn-primary" onClick={login}>
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </form>
          ) : (
            <form>
              <h3>Register</h3>
              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Enter password again" />
              </div>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Tel</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button type="button" className="btn btn-primary" onClick={register}>
                  Register
                </button>

              </div>
              <button onClick={toggleForm}>Switch to Login</button>
            </form>
          )}
        </Modal.Body>
      </Modal>
      {/* Location Selection Modal */}
      <Modal show={locationModalOpen} onHide={() => dispatch({ type: 'SET_LOCATION_MODAL_OPEN', locationModalOpen: false })}>
        <Modal.Body>
          <div className="Location">
            <button onClick={() => handleLocationSelection('pickup')}>รับที่ร้าน</button>
            <button onClick={() => handleLocationSelection('delivery')}>ส่งเดลิเวอรีย์</button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Pickup Time Input Modal */}
      <Modal show={pickupModalOpen} onHide={() => setPickupModalOpen(false)}>
        <Modal.Body>
          <h3>กรุณาระบุเวลา</h3>
          <div className="time">
          <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
          <button onClick={() => {
            dispatch({ type: 'SET_PICKUP_TIME', pickupTime: pickupTime });
            setPickupModalOpen(false);
          }}>
            ยืนยัน
          </button>
          </div>
        </Modal.Body>
      </Modal>


      {/* Delivery Address Input Modal */}
      <Modal show={deliveryModalOpen} onHide={() => setDeliveryModalOpen(false)}>
        <Modal.Body>
          <h3>กรุณาใส่ที่อยู่สำหรับการจัดส่ง</h3>
          <form className="form-container">
            <input
              type="text"
              value={deliveryAddress.street}
              onChange={e => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
              placeholder="ที่อยู่"
            />
            <input
              type="text"
              value={deliveryAddress.city}
              onChange={e => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
              placeholder="ตำบล"
            />
            <input
              type="text"
              value={deliveryAddress.state}
              onChange={e => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
              placeholder="อำเภอ"
            />
            <button onClick={() => {
              dispatch({ type: 'SET_DELIVERY_ADDRESS', deliveryAddress: deliveryAddress });
              setDeliveryModalOpen(false);
            }}>
              ยืนยัน
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
  show={adminModalOpen}
  onHide={() => setAdminModalOpen(false)}
  size="lg"  // Set the modal size to large
>
  <Modal.Body>
    <OrderStatus />
  </Modal.Body>
</Modal>




    </div>
  )

}


export default Header