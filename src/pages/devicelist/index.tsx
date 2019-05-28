import React, { Props } from "react";
import Root from "../../components/root";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";


function DeviceList(props: Props<{}>) {
  return (
    <>
      <Navbar title="devices"/>
      <Card/>
      {props.children}
    </>
  )
}

export default Root(DeviceList,'start');