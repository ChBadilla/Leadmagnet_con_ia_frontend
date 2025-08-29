import React, { useRef } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
// Import new utilities and data
import { calculateUserLevel } from '../utils/scoring';
import { generatePdfFromElement } from '../utils/pdfGenerator';
import resultsContent from '../data/resultsContent.json';
// Import styles
import './Results.css';
import './Results.dark.css';

// This helper function is now much simpler
const getResultContent = (level) => {
  return resultsContent[level] || resultsContent[1]; // Default to level 1
};

const Results = ({ scores }) => {
  const resultsCardRef = useRef(null);
  
  // Use the new utility function for calculation
  const userLevel = calculateUserLevel(scores);
  
  // Get content from the new data source
  const { label, diagnosis, wins, risk, opportunity } = getResultContent(userLevel);

  // Logic to get the correct seal image
  const sealFileName = `${label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}.png`;
  const sealImagePath = `/seals/${sealFileName}`;
  
  // This calculation is simple and fine to keep here
  const scorePercentage = ((userLevel - 1) / 4) * 100;

  const handleDownloadPdf = () => {
    // Use the new PDF generator utility
    generatePdfFromElement(resultsCardRef.current, 'informe-ia-automatizacion.pdf')
      .catch(error => console.error('PDF Generation Error:', error));
  };

  const handleSchedule = () => {
    // Use the new environment variable
    window.open(process.env.REACT_APP_CALENDLY_URL, '_blank');
  };

  return (
    <div className="results-container dark-mode">
      <Card className="results-card" ref={resultsCardRef}>
        <Card.Body>
          <Card.Title className="results-title">Tu nivel de adopción de IA</Card.Title>
          <Card.Subtitle className="results-subtitle">
            Este es tu punto de partida y tus próximos 3 pasos.
          </Card.Subtitle>

          <div className="score-display-wrapper">
            <div className="score-bar-vertical">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`score-level score-level-${i + 1}`}></div>
              ))}
              <div className="user-score-marker" style={{ height: `${scorePercentage}%` }}>
                 <div className="user-score-label">{label}</div>
              </div>
            </div>

            <div className="results-content">
              <div className="diagnosis-phrase">{diagnosis}</div>
              
              <Row>
                <Col md={6} className="info-block">
                  <h5><i className="bi bi-check-circle-fill"></i> 3 victorias rápidas</h5>
                  <ul>
                    {wins.map((win, i) => <li key={i}>{win}</li>)}
                  </ul>
                </Col>
                <Col md={6} className="info-block">
                  <h5><i className="bi bi-shield-exclamation-fill"></i> Riesgo principal</h5>
                  <p>{risk}</p>
                  <h5><i className="bi bi-graph-up-arrow"></i> Oportunidad principal</h5>
                  <p>{opportunity}</p>
                  
                </Col>
              </Row>
            </div>
          </div>

          {/* Seal is now positioned relative to the card body */}
          <img src={sealImagePath} alt={`Sello de nivel ${label}`} className="result-seal" />

          <div className="cta-buttons">
            <Button variant="primary" size="lg" onClick={handleDownloadPdf}>Descargar informe PDF</Button>
            <Button variant="secondary" size="lg" onClick={handleSchedule}>Agendar asesoría 20 min</Button>
          </div>

        </Card.Body>
      </Card>
    </div>
  );
};

export default Results;
