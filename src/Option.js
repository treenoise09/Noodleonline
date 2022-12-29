import React from "react";

function Option({OPid,OPtitle,OPimg,OPprice}) {
  const innerOption = {
    OPid: OPid,
    OPtitle: OPtitle,
    OPimg: OPimg,
    OPprice: OPprice,
  };
  return (
    <div>
      <div>{OPtitle}</div>
      <div>{OPimg}</div>
      <div>{OPprice}</div>
    </div>
  );
}

export default Option;
