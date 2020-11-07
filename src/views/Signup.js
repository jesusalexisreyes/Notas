import React, { useState } from "react";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { startRegisterWithEmailPasswordName } from "../actions/auth";
import { useForm } from "../hooks/useForm";
import { validateEmail } from "../hooks/validation";
import { useDispatch } from "react-redux";
import Cargando from "../components/Cargando";

const Signup = ({ setsignup, history }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
    setLoading(false);
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire("Error", "El nombre es requerido", "error");
      return false;
    } else if (!validateEmail(email)) {
      Swal.fire("Error", "El correo es requerido", "error");
      return false;
    } else if (password.length < 5) {
      Swal.fire("Error", "Contraseña mayor 5 caracteres", "error");
      console.log("Entra aquiii");
      return false;
    }

    return true;
  };

  return (
    <div>
      {loading === false ? (
        <Form className="login-form" onSubmit={handleRegister}>
          <Form.Item>
            <h1>Registro</h1>
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              name="name"
              id="name"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              name="email"
              id="email"
              type="email"
              placeholder="Registra un correo"
              value={email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              name="password"
              id="password"
              type="password"
              placeholder="Registra una Clave"
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
              Registrate
            </Button>
            O{" "}
            <Button onClick={() => setsignup(false)} type="link">
              Ingresa ahora!
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Cargando />
      )}
    </div>
  );
};

export default withRouter(Signup);
