import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";

const API_URL = import.meta.env.VITE_URL_FRONT ;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/questions`);
        if (!response.ok) throw new Error("Erreur serveur");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

   if(questions.length < 0) return <p className="text-slate-500 text-center">pas de questions...</p>;
  if (loading) return <p className="text-slate-500 text-center">Chargement...</p>;
  if (erreur) return <p className="text-red-500 text-center">Erreur lors du chargement des questions.</p>;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Les questions récentes
      </h2>

      <div className="space-y-5">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Questions;