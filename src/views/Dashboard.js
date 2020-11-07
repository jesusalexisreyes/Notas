import React from "react";
import { Layout } from "antd";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";

const Dashboard = ({ history }) => {
  const {name} = useSelector(state => state.auth);
  const { Content, Footer } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 40 }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "80vh",
          }}
        >
          Hola {name} :)
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
};
export default withRouter(Dashboard);
