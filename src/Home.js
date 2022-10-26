import React from 'react'
import "./Home.css";
import BG from "./img/Layer 1.png"
import Noodle from './Noodle';
import Logo from "./img/noodle.gif";

function Home() {
  return (
    <div className='home'>
        <div className='home_container'>
            <img className='Home_img' src={BG} alt=''/>
            <div className='Home_row'>
              <Noodle
              title="เส้นเล็ก"
              price={30}
              img={Logo}/>
               <div>
              <Noodle
              title="เส้นเล็ก"
              price={30}
              img={Logo}/></div>
            </div>
            </div>
    </div>
  )
}

export default Home