import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_URL_FRONT ;

export default function QuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [erreur, setErreur] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setErreur("Le titre et la description sont obligatoires.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titre: title,
          description,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la publication");
      navigate("/");
    } catch (err) {
      setErreur(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="inline-block bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            ✏️ Nouvelle question
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Poser une question</h1>
          <p className="text-gray-500 text-sm mt-1">
            Décris ton problème clairement pour obtenir une réponse rapidement.
          </p>
        </div>

        {/* FORMULAIRE */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          {erreur && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              ⚠️ {erreur}
            </div>
          )}

          {/* TITRE */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📌 Titre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Comment connecter MongoDB avec Node.js ?"
              className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              Sois précis et concis dans ton titre.
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📝 Description <span className="text-red-400">*</span>
            </label>
            <textarea
              placeholder="Décris ton problème en détail : ce que tu as essayé, les erreurs rencontrées..."
              className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition h-40 resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              Plus tu es précis, plus tu obtiendras une bonne réponse.
            </p>
          </div>

          {/* TAGS */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🏷️ Tags
            </label>
            <input
              type="text"
              placeholder="react, node, mongodb, javascript..."
              className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              Sépare les tags par des virgules.
            </p>
          </div>

          {/* BOUTONS */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
            >
              {loading ? "Publication..." : "🚀 Publier"}
            </button>
          </div>

        </div>

        {/* CONSEILS */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-blue-700 mb-2">💡 Conseils pour une bonne question</p>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• Vérifie si ta question n'a pas déjà été posée</li>
            <li>• Inclus le code concerné si possible</li>
            <li>• Mentionne les erreurs que tu obtiens</li>
            <li>• Ajoute les tags appropriés pour être mieux trouvé</li>
          </ul>
        </div>

      </div>
    </div>
  );
}