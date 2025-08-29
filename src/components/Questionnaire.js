import React, { useState, useRef, useEffect } from 'react';
import { Card, ProgressBar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import questions from '../data/questions.json';
import './Questionnaire.css';
import './Questionnaire.dark.css';

const Questionnaire = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const audioRef = useRef(null);

  // This effect handles the navigation logic (the timeout)
  useEffect(() => {
    // Only proceed if an answer has been selected for the current question
    if (answers[currentQuestion] !== null) {
      const timer = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onFinish(answers);
        }
      }, 500); // 500ms delay

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [answers, currentQuestion, onFinish]);

  const handleAnswerSelect = (value) => {
    // This function now only updates the state and plays the sound.
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (audioRef.current) {
      // Reset and play to allow re-playing the sound on quick changes
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="questionnaire-container dark-mode">
      <audio ref={audioRef} src="/select-sound.mp3" preload="auto" />
      <Card className="question-card">
        <Card.Body>
          <div className="progress-header">
            <span>Diagnóstico IA · <span className="fw-bold">{questions.length} preguntas</span></span>
            <span>Pregunta <span className="fw-bold">{currentQuestion + 1}</span> de {questions.length}</span>
          </div>
          <ProgressBar now={progress} />

          <div className="question-title">
            {questions[currentQuestion].text}
          </div>

          <ToggleButtonGroup
            type="radio"
            name={`question-${currentQuestion}`}
            value={currentAnswer}
            onChange={handleAnswerSelect}
            vertical
            className="answer-options d-grid gap-2"
          >
            {questions[currentQuestion].options.map((opt) => (
              <ToggleButton
                key={opt.value}
                id={`q${currentQuestion}-opt${opt.value}`}
                value={opt.value}
                variant="outline-primary"
                size="lg"
                className="text-start rounded"
              >
                {opt.text}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

        </Card.Body>
      </Card>
    </div>
  );
};

export default Questionnaire;
