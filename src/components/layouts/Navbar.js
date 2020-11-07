import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { PageHeader, Button } from "antd";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <PageHeader
    style={{
        border: "1px solid rgb(235, 237, 240)"
    }}
    title={"Note App"}
    extra={[
        <Button onClick={handleLogout} key="logout" type="primary">Cerrar Sesión</Button>,        
      ]}
/>
  );
};
