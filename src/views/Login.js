import React, { useState } from "react";
import { Layout } from "antd";
import { Form, Icon, Input, Button } from "antd";
import Signup from "./Signup";
import { withRouter } from "react-router";
import {
  login,
  startGoogleLogin,
  startLoginEmailPassword,
} from "../actions/auth";
import { isEmpty } from "lodash";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { validateEmail } from "../hooks/validation";
import Cargando from "../components/Cargando";

const Login = ({ history }) => {
  const { Content, Footer } = Layout;
  const [signup, setsignup] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEmpty(email) || isEmpty(password)) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      setLoading(false);
    } else if (!validateEmail(email)) {
      Swal.fire("Error", "El email no es correcto", "error");
      setLoading(false);
    } else {
      const res = await startLoginEmailPassword(email, password);
      if (res.status) {
        dispatch(login(res.uid));
        setLoading(false);
      } else {
        Swal.fire("Error", res.messagge, "error");
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <div>
      {loading === false ? (
        <Layout style={{ height: "100vh" }}>
          <Content
            style={{
              padding: "0 50px",
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 24,
                height: 450,
                width: 400,
                textAlign: "center",
                flexDirection: "column",
                justifyContent: "center",
                display: "flex",
              }}
            >
              {!signup ? (
                <Form className="login-form" onSubmit={handleLogin}>
                  <Form.Item>
                    <h1>Inicio de sesion</h1>
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{
                            color: "rgba(0,0,0,.25)",
                          }}
                        />
                      }
                      name="email"
                      id="email"
                      placeholder="Correo"
                      type="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{
                            color: "rgba(0,0,0,.25)",
                          }}
                        />
                      }
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Clave"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ marginRight: 10 }}
                    >
                      Ingresa
                    </Button>
                    O{" "}
                    <Button onClick={() => setsignup(true)} type="link">
                      Registrate Ahora!
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="danger"
                      htmlType="button"
                      className="login-form-button"
                      style={{ marginRight: 10 }}
                      onClick={handleGoogleLogin}
                    >
                      Google
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Signup setsignup={setsignup} />
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      ) : (
        <Cargando />
      )}
    </div>
  );
};
export default withRouter(Login);
