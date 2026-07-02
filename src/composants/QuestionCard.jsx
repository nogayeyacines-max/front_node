import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-indigo-600 mb-3">
        {question.titre}
      </h3>

      <p className="text-gray-600 mb-4">
        {question.description}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>👤 {question.auteur?.nom || "Anonyme"}</span>
        <span>🕒 {new Date(question.createdAt).toLocaleTimeString()}</span>
      </div>

      <Link
        to={`/detail/${question._id}`}
        className="text-indigo-600 font-medium hover:underline"
      >
        Voir les détails →
      </Link>
    </div>
  );
};

export default QuestionCard;