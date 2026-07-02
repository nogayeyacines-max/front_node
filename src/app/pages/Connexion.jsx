import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_URL_FRONT ;

const Connexion = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Laconnexion = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Veuillez remplir tous les champs");
      return;
    }

    try {
const response = await fetch(`${API_URL}/api/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        toast.success(`Bienvenue ${result.user.prenom} ${result.user.nom} !`);
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error(result.message || "Identifiants incorrects");
      }

    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur. Veuillez réessayer.");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="w-full max-w-md p-8 bg-[#F2E8DD] rounded-xl">

        <h1 className="text-center font-bold text-2xl text-[#1A1A1A] mb-6">Connexion</h1>

        <form onSubmit={Laconnexion}>
          <div className="flex flex-col gap-2">
            <label className="text-[#1A1A1A] font-medium">Email</label>
            <input
              className="px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[#1A1A1A] font-medium">Mot de passe</label>
            <input
              className="px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A1A1A] text-white mt-8 py-3 rounded-lg font-bold hover:bg-[#B08D6E] transition"
          >
            Se connecter
          </button>

          <Link
            to="/inscription"
            className="block text-center mt-4 text-[#B08D6E] font-bold underline hover:text-[#1A1A1A]"
          >
            S'inscrire
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Connexion