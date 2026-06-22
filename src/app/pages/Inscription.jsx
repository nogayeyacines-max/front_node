import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Inscription = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();

    if (!prenom || !nom || !email || !password) {
      toast.warning("Veuillez remplir tous les champs");
      return;
    }

    const data = { prenom, nom, email, password };

    try {
      const response = await fetch("https://backen-node-js.onrender.com/api/auth/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setTimeout(() => navigate('/connexion'), 1500);
      } else {
        toast.error(result.message || "Erreur lors de l'inscription");
      }

    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur. Veuillez réessayer.");
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="w-full max-w-md p-8 bg-[#F2E8DD] rounded-xl">

        <h1 className="text-center font-bold text-2xl text-[#1A1A1A] mb-6">Inscription</h1>

        <form onSubmit={Register}>
          <div className="flex flex-col gap-2">
            <label className="text-[#1A1A1A] font-medium">Prénom</label>
            <input
              className="px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[#1A1A1A] font-medium">Nom</label>
            <input
              className="px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
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
            id="btn2"
            className="w-full bg-[#1A1A1A] text-white mt-8 py-3 rounded-lg font-bold hover:bg-[#B08D6E] transition"
          >
            S'inscrire
          </button>

          <Link
            to="/connexion"
            className="block text-center mt-4 text-[#B08D6E] font-bold underline hover:text-[#1A1A1A]"
          >
            Se connecter
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Inscription