import React from "react";
import { Typography } from "antd";
import { Header } from "antd/es/layout/layout";

const { Title } = Typography

function HeaderNavbar() {
    return(
        <Header
        style={{
          backgroundColor: "#1677ff",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Forum Dicoding
        </Title>
      </Header>
    )
}

export default HeaderNavbar