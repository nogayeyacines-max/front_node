const QuestionCard = ({ question }) => {
  return (
    <div className="bg-[#F2E8DD] rounded-xl p-5 border border-[#E3D5C5] hover:border-[#B08D6E] transition cursor-pointer">
      <h2 className="text-lg font-bold text-[#1A1A1A]">{question.titre}</h2>
      <p className="text-[#6B6258] text-sm mt-2">{question.description}</p>

      <div className="flex justify-between mt-4 text-xs text-[#8C8378]">
        <span className="font-medium">{question.auteur}</span>
        <span>{question.heure}</span>
      </div>
    </div>
  );
};

export default QuestionCard;