import React from "react";
import './Header.css'
import Logo from './img/Onlinenoodle-logos_transparent.png'
import SearchIcon from '@mui/icons-material/Search';

function Header() {
    return(
        <div className="header">
            <img className="header_logo" src={Logo}/>
            <div className="header_search">
                <input className="header_searchInput" type='text'/>
                <SearchIcon className="header_searchIcon"/>
            </div>
            <div className="header_nav">
            <div className="header_option">
                    <span className="header_optionLineOne">
                        Hello Guest
                    </span>
                    <span className="header_optionLineTwo">Returns</span>
                    <span className="header_optionLineOne">
                        Your Location
                    </span>
                    
            </div>
            <div className="header_Option">
                            <span className="header_optionLineTwo">
                        Sign In
                    </span>
                <span className="header_optionLineTwo">Orders</span>
            </div>
        </div>
        </div>
    )
    
}


export default Header