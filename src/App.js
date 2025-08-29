import React, { useReducer } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { submitQuiz } from './api'; // New Import

// Constants for application states
const APP_STATES = {
  LANDING: 'landing',
  QUIZ: 'quiz',
  RESULTS: 'results',
};

// Action types for the reducer
const ACTIONS = {
  START_QUIZ: 'start_quiz',
  FINISH_QUIZ: 'finish_quiz',
  SET_ERROR: 'set_error',
};

// Initial state for the reducer
const initialState = {
  appState: APP_STATES.LANDING,
  userScores: [],
  userData: {},
  error: null,
};

// Reducer function to manage state transitions
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_QUIZ:
      return {
        ...state,
        appState: APP_STATES.QUIZ,
        userData: action.payload,
        error: null, // Clear previous errors
      };
    case ACTIONS.FINISH_QUIZ:
      return {
        ...state,
        appState: APP_STATES.RESULTS,
        userScores: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleStart = (data) => {
    dispatch({ type: ACTIONS.START_QUIZ, payload: data });
  };

  const handleFinish = (scores) => {
    dispatch({ type: ACTIONS.FINISH_QUIZ, payload: scores });

    const finalData = { ...state.userData, answers: scores };
    console.log('Enviando al backend:', finalData);

    submitQuiz(finalData)
      .then(data => {
        console.log('Respuesta del backend:', data);
      })
      .catch(error => {
        console.error('Error enviando datos:', error);
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Ocurrió un error al enviar tus respuestas. Por favor, revisa tu conexión o inténtalo de nuevo más tarde.' });
      });
  };

  const renderState = () => {
    switch (state.appState) {
      case APP_STATES.QUIZ:
        return <Questionnaire onFinish={handleFinish} />;
      case APP_STATES.RESULTS:
        return <Results scores={state.userScores} />;
      case APP_STATES.LANDING:
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="App">
      {state.error && <div style={{ color: 'red', padding: '10px', border: '1px solid red', margin: '10px' }}>{state.error}</div>}
      {renderState()}
    </div>
  );
}

export default App;