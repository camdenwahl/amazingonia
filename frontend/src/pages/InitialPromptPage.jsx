// src/pages/InitialPromptPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

function InitialPromptPage() {
  const { setUserInfo, setDesignOrder, setStartTime, setTargetProduct } = useContext(GlobalContext);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for age and experience
    if (age < 10 || age > 120) {
      alert('Please enter a realistic age (between 10 and 120).');
      return;
    }
    if (!gender) {
      alert('Please select your gender.');
      return;
    }
    if (!experience) {
      alert('Please select your technology experience level.');
      return;
    }

    setUserInfo({ age, gender, experience });

    // Randomly decide the order of designs
    const designs = ['/homepage', '/golden'];
    const shuffledDesigns = designs.sort(() => Math.random() - 0.5);
    setDesignOrder(shuffledDesigns);

    // Set the same target product for both designs
    setTargetProduct({
      productUrl: 'https://www.bigbasket.com/pd/40188829/faces-canada-bath-n-body-milk-honey-body-cream-200-g/',
      productName: 'Bath n Body Body Cream - Milk & Honey',
    });

    setStartTime(Date.now());
    navigate(shuffledDesigns[0]);
  };

  return (
    <div className="prompt-page p-4 max-w-lg mx-auto bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Study</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Demographic inputs */}
        <label className="block">
          Age:
          <input
            type="number"
            min="10"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block">
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </label>
        <label className="block">
          Experience Operating Technology (1-5):
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">Select your experience level</option>
            <option value="1">1 - Beginner (Basic knowledge, occasional use)</option>
            <option value="2">2 - Novice (Comfortable with common tasks)</option>
            <option value="3">3 - Intermediate (Regular user, handles common issues)</option>
            <option value="4">4 - Advanced (Can troubleshoot and solve issues)</option>
            <option value="5">5 - Expert (Deep understanding, often helps others)</option>
          </select>
        </label>
        {/* Task instructions */}
        <p className="mt-4 text-center">You are to find this product and add it to your cart. You are expected to use the search function to help you.</p>
        <p className = "text-center font-extrabold">Bath n Body Body Cream - Milk & Honey</p>
        <img
          src="https://www.bigbasket.com/media/uploads/p/l/40188829_1-faces-canada-bath-n-body-milk-honey-body-cream.jpg"
          alt="Bath n Body Body Cream - Milk & Honey"
          className="block mx-auto my-4 w-full max-w-xs rounded"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
        >
          Start
        </button>
      </form>
    </div>
  );
}

export default InitialPromptPage;
