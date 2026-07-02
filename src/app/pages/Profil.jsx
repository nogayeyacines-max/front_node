import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const chargerProfil = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${storedUser.id}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setQuestions(data.questions);
        setReponses(data.reponses);
      } else {
        toast.error(data.message || "Erreur lors du chargement du profil");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storedUser) {
      toast.warning("Connecte-toi pour voir ton profil");
      navigate('/connexion');
      return;
    }
    chargerProfil();
  }, []);

  const seDeconnecter = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/connexion');
  };

  const supprimerQuestion = async (e, qId) => {
    e.stopPropagation();
    if (!window.confirm("Supprimer définitivement cette question ?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/questions/${qId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q._id !== qId));
        toast.success("Question supprimée");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Erreur serveur");
    }
  };

  const supprimerReponse = async (e, rId) => {
    e.stopPropagation();
    if (!window.confirm("Supprimer cette réponse ?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/reponses/${rId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setReponses((prev) => prev.filter((r) => r._id !== rId));
        toast.success("Réponse supprimée");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Erreur serveur");
    }
  };

  if (loading) return <div className="w-full min-h-screen bg-[#1A1A1A] text-[#D9C5B2] p-10">Chargement...</div>;
  if (!user) return <div className="w-full min-h-screen bg-[#1A1A1A] text-[#D9C5B2] p-10">Profil introuvable</div>;

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] px-10 py-10">

      {/* En-tête profil */}
      <div className="bg-[#F2E8DD] rounded-xl p-6 flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-[#E3D5C5] flex items-center justify-center text-2xl font-bold text-[#1A1A1A] overflow-hidden">
          {user.image ? (
            <img src={user.image} alt={user.pseudo} className="w-full h-full object-cover" />
          ) : (
            user.pseudo?.charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">{user.pseudo}</h1>
          <p className="text-sm text-[#8C8378] mt-1">
            {questions.length} question{questions.length > 1 ? 's' : ''} · {reponses.length} réponse{reponses.length > 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={seDeconnecter}
          className="bg-[#1A1A1A] text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition"
        >
          Se déconnecter
        </button>
      </div>

      {/* Questions posées */}
      <h2 className="text-xl font-bold text-[#D9C5B2] mb-4">Mes questions</h2>
      <div className="flex flex-col gap-4 mb-10">
        {questions.length === 0 && (
          <p className="text-[#8C8378]">Aucune question posée pour le moment.</p>
        )}
        {questions.map((q) => (
          <div
            key={q._id}
            onClick={() => navigate(`/detail/${q._id}`)}
            className="bg-[#F2E8DD] rounded-xl p-5 cursor-pointer hover:bg-[#E3D5C5] transition flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold text-[#1A1A1A]">{q.titre}</h3>
              <p className="text-sm text-[#8C8378] mt-1">
                {q.votes} votes · {new Date(q.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/modifier_question/${q._id}`); }}
                className="text-[#B08D6E] font-bold underline hover:text-[#1A1A1A]"
              >
                Modifier
              </button>
              <button
                onClick={(e) => supprimerQuestion(e, q._id)}
                className="text-red-600 font-bold underline hover:text-red-800"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Réponses données */}
      <h2 className="text-xl font-bold text-[#D9C5B2] mb-4">Mes réponses</h2>
      <div className="flex flex-col gap-4">
        {reponses.length === 0 && (
          <p className="text-[#8C8378]">Aucune réponse donnée pour le moment.</p>
        )}
        {reponses.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/detail/${r.question}`)}
            className="bg-[#F2E8DD] rounded-xl p-5 cursor-pointer hover:bg-[#E3D5C5] transition flex justify-between items-start"
          >
            <div>
              <p className="text-[#1A1A1A] line-clamp-2">{r.contenu}</p>
              <p className="text-sm text-[#8C8378] mt-1">
                {r.votes} votes · {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => supprimerReponse(e, r._id)}
              className="text-red-600 font-bold underline hover:text-red-800 text-sm"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Profil