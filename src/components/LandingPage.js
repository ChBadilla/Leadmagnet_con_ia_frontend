import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = ({ onStart }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      // Pass the form data to the parent component
      onStart(formData);
    }
  };

  return (
    <div className="landing-container">
      <Card className="hero-card">
        <Card.Body>
          <Card.Title>Evalúe su preparación en IA y acelere su ventaja operativa</Card.Title>
          <Card.Subtitle className="mb-4">
            Responde en solo 5 minutos y recibe un plan personalizado
          </Card.Subtitle>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label visuallyHidden>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa tu nombre.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label visuallyHidden>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa un email válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label visuallyHidden>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                required
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa tu número de teléfono.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConsent">
              <Form.Check
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                label="Acepto recibir el informe y comunicaciones relacionadas."
                feedback="Debes aceptar para continuar."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="cta-button">
              Comenzar diagnóstico
            </Button>
          </Form>

          <div className="footer-text">
            3 minutos. Sin costo.
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;
