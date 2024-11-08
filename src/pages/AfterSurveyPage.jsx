// src/pages/AfterSurveyPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

function AfterSurveyPage() {
  const {
    userInfo,
    designOrder,
    startTime,
    taskTimings,
    surveyResponses,
    setSurveyResponses,
  } = useContext(GlobalContext);
  const [difficulty1, setDifficulty1] = useState('');
  const [difficulty2, setDifficulty2] = useState('');
  const [preferredDesign, setPreferredDesign] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responses = { difficulty1, difficulty2, preferredDesign };
    setSurveyResponses(responses);

    // Determine which design was shown first
    const firstDesignShown = designOrder[0]; // Get the first design in the order array

    // Prepare data to send
    const dataToSend = {
      userInfo,
      designOrder,
      firstDesignShown,
      taskTimings,
      surveyResponses: responses,
    };

    try {
      const response = await fetch('http://localhost:5000/api/submit-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      navigate('/thank-you');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="after-survey-page p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">After Survey</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Rating of perceived difficulty (Design 1):
          <select
            value={difficulty1}
            onChange={(e) => setDifficulty1(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select difficulty for Design 1</option>
            <option value="1">1 - Very easy</option>
            <option value="2">2 - Easy</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Difficult</option>
            <option value="5">5 - Very difficult</option>
          </select>
        </label>
        <label className="block">
          Rating of perceived difficulty (Design 2):
          <select
            value={difficulty2}
            onChange={(e) => setDifficulty2(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select difficulty for Design 2</option>
            <option value="1">1 - Very easy</option>
            <option value="2">2 - Easy</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Difficult</option>
            <option value="5">5 - Very difficult</option>
          </select>
        </label>
        <label className="block">
          Preferred Design (1 or 2):
          <select
            value={preferredDesign}
            onChange={(e) => setPreferredDesign(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select your preferred design</option>
            <option value="1">1 - First design</option>
            <option value="2">2 - Second design</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
}

export default AfterSurveyPage;
