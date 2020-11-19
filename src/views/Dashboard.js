import React, { useState } from "react";
import { Layout, Input, Form } from "antd";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { startDeleting, startNewNotes, startSaveNote } from "../actions/notes";
import { useForm } from "../hooks/useForm";
import { Modal, Button, Card, CardDeck } from "react-bootstrap";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const Dashboard = ({ history }) => {
  const [show, setShow] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [showUpdate, setShowUpadte] = useState(false);
  const { notes } = useSelector((state) => state.notes);
  const { Content, Footer } = Layout;
  const { name } = useSelector((state) => state.auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpadte(false);
  const handleShowUpdate = () => setShowUpadte(true);
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    title: "",
    body: "",
  });

  const { title, body } = formValues;

  const [formValuesUpdate, handleInputChangeUpdate] = useForm({
    titleUpdate: "",
    bodyUpdate: "",
  });

  var { titleUpdate, bodyUpdate } = formValuesUpdate;

  const handleAddNew = (e) => {
    e.preventDefault();

    dispatch(startNewNotes(title, body));
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Precaución",
      message: "¿Seguro de eliminar la nota?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            dispatch(startDeleting(id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const viewUpdate = (note) => {
    formValuesUpdate.titleUpdate = note.title;
    formValuesUpdate.bodyUpdate = note.body;
    titleUpdate = note.title;
    bodyUpdate = note.body;
    setIdUpdate(note.id);
    handleShowUpdate();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const note = {
      id: idUpdate,
      title: titleUpdate,
      body: bodyUpdate,
      date: new Date().getTime(),
    };
    dispatch(startSaveNote(note));
    handleCloseUpdate();
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 40 }}>
        <Button variant="outline-primary" onClick={handleShow}>
          Crear nota
        </Button>{" "}
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "80vh",
          }}
        >
          Hola {name} :)
          <br />
          {notes.map((note) => (
            <CardDeck className="grid" key={note.id}>
              <Card
                style={{ width: "18rem", background: "#F2E2CF" }}
                className="box"
              >
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Subtitle>
                    <span>{moment(note.date).format("dddd")},</span>
                    <span>
                      {" "}
                      {moment(note.date).format("MMMM")}{" "}
                      {moment(note.date).format("D")}
                    </span>
                  </Card.Subtitle>
                  <Card.Text>{note.body}</Card.Text>
                  <Button
                    variant="outline-primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      viewUpdate(note);
                    }}
                  >
                    Editar nota
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(note.id)}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </CardDeck>
          ))}
          <br />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}></Footer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nota</Modal.Title>
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
            Close{" "}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Item>
              <Input
                name="titleUpdate"
                value={titleUpdate}
                onChange={handleInputChangeUpdate}
                placeholder="Titulo"
              />
            </Form.Item>
            <Form.Item>
              <Input
                name="bodyUpdate"
                value={bodyUpdate}
                onChange={handleInputChangeUpdate}
                placeholder="Nota..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="login-form-button"
                style={{ marginRight: 10 }}
                onClick={handleClose}
              >
                Editar
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
export default withRouter(Dashboard);
