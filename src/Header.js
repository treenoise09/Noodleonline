import React from "react";
import './Header.css'
import Logo from './img/Onlinenoodle-logos_transparent.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import {useStateValue} from "./stateprovider";
function Header() {
    const [{basket},dispatch] = useStateValue();
    return(
        <div className="header">
            <Link to="/">
            <img className="header_logo" src={Logo} alt=""/>
            </Link>
            <div className="header_search">
                <input className="header_searchInput" type='text'/>
                <SearchIcon className="header_searchIcon"/>
            </div>
            <div className="header_nav">
            <Link to="/login">
            <div className="header_option">
                
                    <span className="header_optionLineOne">
                        Hello Guest
                    </span>
                    <span className="header_optionLineTwo">
                        Sign In
                    </span>
                    
                    
            </div>
            </Link>
            <div className="header_option">
                    <span className="header_optionLineOne">
                        Your
                    </span>
                    <span className="header_optionLineTwo">
                        Location
                    </span>
            </div><Link to="/checkout">
            <div className="header_optionBasket">
            <ShoppingBasketIcon/>
            <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
            </div>
            </Link>
        </div>
        </div>
    )
    
}


export default Header