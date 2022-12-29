import React, { useState } from "react";
import "./Noodle.css";
import { useStateValue } from "./stateprovider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useCollapse from "react-collapsed";
import { MDBIcon } from "mdb-react-ui-kit";
import Option from "./Option";
import Badge from "@mui/material/Badge";

function Noodle({ id, title, img, price, status, option }) {
  let count = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const [{ basket }, dispatch] = useStateValue();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [counter, setCount] = useState(count);
  const OPtional = (id) => {
    setCount({ ...counter, [id]: counter[id] + 1 });
  };
  const addTobasket = (status) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        img: img,
        price: price,
        status: status,
        option: option,
      },
    });
  };
  return (
    <div className="noodle">
      <div className="Product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>฿</small>
          <strong>{price}</strong>
        </p>
      </div>
      <img src={img} alt="" />
      <div
        className="ex1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "-webkit-fill-available",
          margin: "3%",
        }}
      >
        <button onClick={() => addTobasket("แห้ง")}>แห้ง</button>
        <button onClick={() => addTobasket("น้ำข้น")}>น้ำข้น</button>
        <button onClick={() => addTobasket("น้ำใส")}>น้ำใส</button>
      </div>
      <div
        className="ex2"
        style={{ border: "1px solid black", width: "-webkit-fill-available" }}
        {...getToggleProps()}
      >
        {isExpanded ? (
          <MDBIcon fas icon="angle-double-up" />
        ) : (
          <AddCircleOutlineIcon />
        )}
        Option
      </div>
      <div {...getCollapseProps()}>
        <div
          className="content"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: "1em",
          }}
        >
          <div
            className="optional"
            onClick={() => {
              OPtional(1);
            }}
          >
            <Badge
              id="1"
              badgeContent={counter[1]}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="primary"
            >
              <Option OPtitle="เส้น" OPprice={10} />
            </Badge>
          </div>
          <div
            className="optional"
            onClick={() => {
              OPtional(2);
            }}
          >
            <Badge
              id="2"
              badgeContent={counter[2]}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="primary"
            >
              <Option OPtitle="ลูกชิ้น" OPprice={10} />
            </Badge>
          </div>
          <div
            className="optional"
            onClick={() => {
              OPtional(3);
            }}
          >
            <Badge
              id="3"
              badgeContent={counter[3]}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="primary"
            >
              <Option OPtitle="หมู" OPprice={10} />
            </Badge>
          </div>
          <div
            className="optional"
            onClick={() => {
              OPtional(4);
            }}
          >
            <Badge
              id="4"
              badgeContent={counter[4]}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="primary"
            >
              <Option OPtitle="เนื้อ" OPprice={10} />
            </Badge>
          </div>
          <div
            className="optional"
            onClick={() => {
              OPtional(5);
            }}
          >
            <Badge
              id="5"
              badgeContent={counter[5]}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              color="primary"
            >
              <Option OPtitle="น่องไก่" OPprice={10} />
            </Badge>
          </div>
          <button>
            <MDBIcon fas icon="angle-double-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Noodle;
