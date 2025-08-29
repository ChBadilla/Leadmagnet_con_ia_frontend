/**
 * Calculates the user's level based on an array of scores.
 * @param {number[]} scores - An array of scores from the questionnaire.
 * @returns {number} The calculated user level, clamped between 1 and 5.
 */
export const calculateUserLevel = (scores = []) => {
  if (!scores || scores.length === 0) {
    return 1;
  }
  const totalScore = scores.reduce((sum, score) => sum + (score || 0), 0);
  const averageLevel = Math.round(totalScore / scores.length);
  
  // Clamp the result between 1 and 5
  const userLevel = Math.max(1, Math.min(5, averageLevel));
  
  return userLevel;
};
