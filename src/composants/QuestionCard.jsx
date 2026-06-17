const QuestionCard = ({ question }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold">{question.titre}</h2>
      <p className="text-gray-600 mt-2">{question.description}</p>

      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>{question.auteur}</span>
        <span>{question.heure}</span>
      </div>
    </div>
  );
};

export default QuestionCard;