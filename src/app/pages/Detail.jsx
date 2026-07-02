import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ titre: "", description: "" });
  const [actionError, setActionError] = useState("");

  // Réponses
  const [reponses, setReponses] = useState([]);
  const [newReponse, setNewReponse] = useState("");
  const [reponseLoading, setReponseLoading] = useState(false);
  const [reponseError, setReponseError] = useState("");
  const [reponseSuccess, setReponseSuccess] = useState("");

  const token = localStorage.getItem("token");
  const userId = token ? getUserIdFromToken(token) : null;
  const estAuteur = question && userId && question.auteur?._id === userId;

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`);
      if (!response.ok) throw new Error("Question introuvable");
      const data = await response.json();
      setQuestion(data);
      setFormData({ titre: data.titre, description: data.description });
    } catch (error) {
      console.error(error);
      setErreur(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchReponses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}/reponses`);
      if (!response.ok) throw new Error("Erreur lors du chargement des réponses");
      const data = await response.json();
      setReponses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchReponses();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette question définitivement ?")) return;
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Échec de la suppression");
      navigate("/");
    } catch (error) {
      setActionError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Échec de la modification");
      const data = await response.json();
      setQuestion(data.question);
      setIsEditing(false);
    } catch (error) {
      setActionError(error.message);
    }
  };

  const handleReponseSubmit = async (e) => {
    e.preventDefault();

    if (!newReponse.trim()) {
      setReponseError("La réponse ne peut pas être vide.");
      return;
    }

    if (!token) {
      setReponseError("Tu dois être connecté pour répondre.");
      return;
    }

    setReponseLoading(true);
    setReponseError("");
    setReponseSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/questions/${id}/reponses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contenu: newReponse }),
      });

      if (!response.ok) throw new Error("Échec de la publication");

      setNewReponse("");
      setReponseSuccess("Réponse publiée avec succès !");
      fetchReponses();
    } catch (error) {
      setReponseError(error.message);
    } finally {
      setReponseLoading(false);
    }
  };

  const handleDeleteReponse = async (reponseId) => {
    if (!window.confirm("Supprimer cette réponse ?")) return;
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}/reponses/${reponseId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Échec de la suppression");
      fetchReponses();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-slate-500 text-center">Chargement...</p>
      </section>
    );
  }

  if (erreur || !question) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Question introuvable</h1>
          <p className="text-slate-500 mb-6">Cette question n'existe pas ou a été supprimée.</p>
          <Link to="/" className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux questions
      </Link>

      {/* Question */}
      <article className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {question.tags?.map((tag, index) => (
              <span key={index} className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {question.resolu && (
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                Résolue
              </span>
            )}
          </div>

          {!isEditing ? (
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {question.titre}
            </h1>
          ) : (
            <input
              className="w-full border rounded-lg p-2 mb-4 text-xl font-bold"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>Posée par {question.auteur?.nom || "Anonyme"}</span>
            <span>{new Date(question.createdAt).toLocaleString()}</span>
            <span>{question.votes ?? 0} votes</span>
          </div>

          {estAuteur && !isEditing && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                Modifier
              </button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
                Supprimer
              </button>
            </div>
          )}
          {actionError && <p className="text-red-500 text-sm mt-3">{actionError}</p>}
        </div>

        <div className="p-6 sm:p-8">
          {!isEditing ? (
            <p className="text-slate-600 leading-relaxed">{question.description}</p>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <textarea
                className="w-full border rounded-lg p-3"
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  Enregistrer
                </button>
                <button type="button" onClick={() => { setIsEditing(false); setFormData({ titre: question.titre, description: question.description }); }}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </article>

      {/* Réponses */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {reponses.length} réponse{reponses.length > 1 ? "s" : ""}
        </h2>

        {reponses.length === 0 ? (
          <p className="text-slate-500">Aucune réponse pour l'instant. Sois le premier à répondre !</p>
        ) : (
          <div className="space-y-4">
            {reponses.map((reponse) => (
              <div key={reponse._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <p className="text-slate-600 leading-relaxed mb-4">{reponse.contenu}</p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Par {reponse.auteur?.nom || "Anonyme"} — {new Date(reponse.createdAt).toLocaleString()}</span>
                  {userId && reponse.auteur?._id === userId && (
                    <button
                      onClick={() => handleDeleteReponse(reponse._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formulaire de réponse */}
      {token ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Votre réponse</h3>
          <form onSubmit={handleReponseSubmit} className="space-y-4">
            <textarea
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={5}
              placeholder="Écris ta réponse ici..."
              value={newReponse}
              onChange={(e) => setNewReponse(e.target.value)}
            />
            {reponseError && <p className="text-red-500 text-sm"><span>{reponseError}</span></p>}
            {reponseSuccess && <p className="text-emerald-600 text-sm"><span>{reponseSuccess}</span></p>}
            <button
              type="submit"
              disabled={reponseLoading}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <span>{reponseLoading ? "Publication..." : "Publier la réponse"}</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
          <p className="text-slate-500 mb-4">Tu dois être connecté pour répondre.</p>
          <Link to="/connexion" className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Se connecter
          </Link>
        </div>
      )}
    </section>
  );
};

export default Detail;