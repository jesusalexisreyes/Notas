import React, { useState } from "react";
import { Layout, Input, Form,Icon } from "antd";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { startNewNotes } from "../actions/notes";
import { useForm } from "../hooks/useForm";
import { Modal, Button, Card, CardDeck } from 'react-bootstrap'



export const Dashboard = ({ history }) => {
  const [show, setShow] = useState(false);
  const { notes } = useSelector(state => state.notes);
  const { Content, Footer } = Layout;
  const { name } = useSelector(state => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    title: '',
    body: ''
  });

  const { title, body } = formValues;


  const handleAddNew = (e) => {
    e.preventDefault();

    dispatch(startNewNotes(title, body));
  }


  return (
    <Layout style={{ height: "100vh" }}>

      <Content style={{ padding: "0 50px", marginTop: 40  }}>
        <Button   variant="outline-primary" onClick={handleShow}>Crear nota</Button>{' '}


        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "80vh",
          }}
        >
          Hola {name} :)
          <br/>

          {

            notes.map(note => (














              <CardDeck className="grid">
                <Card style={{ width: '18rem', background: '#F2E2CF' } } className="box">
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                      {
                        note.body
                      }
                    </Card.Text>
                    <Button variant="outline-primary" style={{ marginRight: '10px' }} href="#">Editar nota</Button>
                    <Button variant="outline-danger" href="#">Eliminar</Button>
                  </Card.Body>
                </Card>
              </CardDeck>











            ))
          }
          <br/>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleAddNew}>

            <Form.Item>
              <Input

                name="title"
                value={title}

                onChange={handleInputChange}
                placeholder="Titulo"
              />
            </Form.Item>
            <Form.Item>
              <Input


                name="body"
                value={body}

                onChange={handleInputChange}
                placeholder="Nota..."
              />
            </Form.Item>
            <Form.Item>




              <Button

                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: 10 }}
                onClick={handleClose}
              >
                Guardar
                </Button>

            </Form.Item>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
export default withRouter(Dashboard);
