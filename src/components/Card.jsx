import React from "react";
import { Link } from "react-router-dom";

// Reusable Card Component
const Card = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">Research Title</h3>
      <p className="text-gray-400 mb-4">Short description of the research paper or dataset.</p>
      <Link to="#" className="text-green-400 hover:text-green-300 transition duration-300">
        Read More →
      </Link>
    </div>
  );
};

export default Card;