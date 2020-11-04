import React, { useState } from "react";
import { Form, Icon, Input, Button } from "antd";
import app from "../firebaseConfig";
import { withRouter } from "react-router";
import Errores from "../components/Errores";

const Signup = ({ setsignup, history }) => {
    const [error, seterror] = useState("");
    const handleSignUp = async e => {
        e.preventDefault();
        const { correo, clave } = e.target.elements;





        
        await app


    
            .auth()
            .createUserWithEmailAndPassword(correo.value, clave.value)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                seterror(error.message);
            });
    };
    return (
        <Form className="login-form" onSubmit={handleSignUp}>
            <Form.Item>
                <h1>Registro</h1>
            </Form.Item>
            {error? <Form.Item><Errores mensaje={error}/></Form.Item>:null}



            <Form.Item>
                <Input
                    prefix={
                        <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                        />
                    }
                    name="correo"
                    placeholder="Registra un correo"
                />
            </Form.Item>
            <Form.Item>
                <Input
                onBlur="comprobarPassowrd();"
                    prefix={
                        <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                        />
                    }
                    name="clave"
                    type="password"
                    placeholder="Registra una Clave"
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
                <Button   onClick={() => setsignup(false)} type="link">
                    Ingresa ahora!
                </Button>
            </Form.Item>
        </Form>

        

        
    );
};



export default withRouter(Signup);
