import { React, useState } from "react";
import "./Home.css";
import BG from "./img/Layer 1.png";
import sen from "./img/noodles.png";
import drink from "./img/soft-drink.png";
import sweet from "./img/ice-cream.png";
import Noodle from "./Noodle";
import Logo from "./img/noodle.gif";
import Subtotal from "./Subtotal";
import { useStateValue } from "./stateprovider";
import CartProduct from "./CartProduct";
import Button from "react-bootstrap/Button";

function Home() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="home">
      <div className="home_container">
        <img className="Home_img" src={BG} alt="" />
        <div
          className="row"
          style={{
            flexWrap: "nowrap",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Button size="lg" variant="light">
              <img className="icon" src={sen}></img>Noodle
            </Button>{" "}
          </div>
          <div>
            <Button size="lg" variant="light">
              <img className="icon" src={drink}></img>Drink
            </Button>{" "}
          </div>
          <div>
            <Button size="lg" variant="light">
              <img className="icon" src={sweet}></img>Dessert
            </Button>{" "}
          </div>
        </div>
        <div className="home_row">
          <Noodle title="เส้นเล็ก" price={30} img={Logo} />
          <Noodle title="เส้นใหญ่" price={30} img={Logo} />
          <Noodle title="เส้นหมี่" price={30} img={Logo} />
          <Noodle title="บะหมี่" price={30} img={Logo} />
          <Noodle title="มาม่า" price={30} img={Logo} />
          <Noodle title="หมี่หยก" price={30} img={Logo} />
          <Noodle title="วุ้นเส้น" price={30} img={Logo} />
          <Noodle title="บะหมี่เส้นผัก" price={30} img={Logo} />
        </div>
      </div>
      <div className="cheackout_right">
        <div className="busket">
          {basket.map((item) => (
            <CartProduct
              id={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              status={item.status}
              option={item.option}
            />
          ))}
        </div>
        <Subtotal />
      </div>
    </div>
  );
}

export default Home;
