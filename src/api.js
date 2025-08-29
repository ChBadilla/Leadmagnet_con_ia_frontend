const API_URL = process.env.REACT_APP_API_URL;

export const submitQuiz = (data) => {
  return fetch(`${API_URL}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      // Handle HTTP errors like 4xx/5xx
      throw new Error('Error del servidor. Inténtalo más tarde.');
    }
    return response.json();
  });
};
