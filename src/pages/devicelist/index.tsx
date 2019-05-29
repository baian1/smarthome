import React, { Props } from "react";
import withRoot from "../../components/root";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";


function DeviceList(props: Props<{}>): JSX.Element {
  return (
    <>
      <Navbar title="devices" />
      <Card />
      {props.children}
    </>
  )
}

export default withRoot(DeviceList, 'start');