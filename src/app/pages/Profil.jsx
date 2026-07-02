import { useState, useRef } from 'react';
import { Pencil, X, Save, MessageCircleQuestion, MessageSquareReply, ThumbsUp, Award } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Données de démo — à remplacer par les vraies données de ton contexte auth
const MOCK_USER = {
  name: 'Fitamatou',
  email: 'fatimatou@example.com',
  bio: "Passionnée d'entraide et de partage de connaissances. J'aime aider sur les sujets liés au développement web.",
  joinedAt: '2024-03-12',
  photo: '',   // URL de la photo, vide = affiche les initiales
  stats: {
    questions: 12,
    answers: 47,
    votes: 138,
    reputation: 'Contributeur',
  },
};

const REPUTATION_STYLES = {
  'Nouveau membre': { bg: 'bg-gray-100', text: 'text-gray-600' },
  Contributeur: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Expert: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

function getInitials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

const Profil = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, bio: user.bio, email: user.email });
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef(null);

  const repStyle = REPUTATION_STYLES[user.stats.reputation] ?? REPUTATION_STYLES['Nouveau membre'];
  const joinedLabel = new Date(user.joinedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const handlePhotoClick = () => {
    if (!photoLoading) fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setPhotoError('Format non supporté. Utilisez JPG, PNG ou WebP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError('La photo ne doit pas dépasser 2 Mo.');
      return;
    }

    setPhotoError('');
    setPhotoLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setPhotoError('Tu dois être connecté·e pour modifier ta photo.');
      setPhotoLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch(`${API_URL}/api/auth/photo`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erreur lors de la mise à jour.');

      setUser((prev) => ({ ...prev, photo: `${API_URL}${data.photo}` }));
    } catch (err) {
      setPhotoError(err.message || 'Impossible de changer la photo. Réessaie.');
    } finally {
      setPhotoLoading(false);
      e.target.value = '';
    }
  };

  const startEditing = () => {
    setFormData({ name: user.name, bio: user.bio, email: user.email });
    setIsEditing(true);
  };
  const cancelEditing = () => setIsEditing(false);
  const saveChanges = () => {
    setUser((prev) => ({ ...prev, ...formData }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">

              <div className="relative group">
                <button
                  onClick={handlePhotoClick}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  title="Changer la photo"
                  disabled={photoLoading}
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Photo de profil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {!isEditing && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                  <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${repStyle.bg} ${repStyle.text}`}>
                    {user.stats.reputation}
                  </span>
                </div>
              )}
            </div>

            {!isEditing ? (
              <button
                onClick={startEditing}
                className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                <Pencil size={16} />
                Modifier
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={cancelEditing} className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
                  <X size={16} /> Annuler
                </button>
                <button onClick={saveChanges} className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  <Save size={16} /> Enregistrer
                </button>
              </div>
            )}
          </div>

          {photoError && (
            <p className="mt-2 text-xs text-red-500">{photoError}</p>
          )}

          {!isEditing ? (
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{user.bio}</p>
          ) : (
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Nom</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Bio</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-gray-400">Membre depuis {joinedLabel}</p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Activité</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={MessageCircleQuestion} label="Questions posées" value={user.stats.questions} />
            <StatCard icon={MessageSquareReply} label="Réponses données" value={user.stats.answers} />
            <StatCard icon={ThumbsUp} label="Votes reçus" value={user.stats.votes} />
            <StatCard icon={Award} label="Réputation" value={user.stats.reputation} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profil;