import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full bg-[#1e1e2e] text-gray-400 text-sm'>

      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-orange-400 font-bold text-lg mb-2">Nogaye Yacine Sarr</h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            Une plateforme communautaire pour poser vos questions, partager vos connaissances et progresser ensemble.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><NavLink to="/" className="hover:text-orange-400 transition">Accueil</NavLink></li>
            <li><NavLink to="/connexion" className="hover:text-orange-400 transition">Connexion</NavLink></li>
            <li><NavLink to="/inscription" className="hover:text-orange-400 transition">Inscription</NavLink></li>
            <li><NavLink to="/ajouter_question" className="hover:text-orange-400 transition">Poser une question</NavLink></li>
          </ul>
        </div>

        {/* COMPTE */}
        <div>
          <h3 className="text-white font-semibold mb-3">Compte</h3>
          <ul className="space-y-2">
            <li><NavLink to="/profil" className="hover:text-orange-400 transition">Mon profil</NavLink></li>
            <li><NavLink to="/connexion" className="hover:text-orange-400 transition">Se connecter</NavLink></li>
            <li><NavLink to="/inscription" className="hover:text-orange-400 transition">Créer un compte</NavLink></li>
          </ul>
        </div>

        {/* CONTACT */}
<div>
  <h3 className="text-white font-semibold mb-3">Contact</h3>
  <ul className="space-y-2">
    <li className="flex items-center gap-2">
      <span>✉️</span>
      <a href="mailto:contact@devforum.sn" className="hover:text-orange-400 transition">
        contact@devforum.sn
      </a>
    </li>
    <li className="flex items-center gap-2">
      <span>📍</span>
      <span>Dakar, Sénégal</span>
    </li>
  </ul>
</div>

      </div>

      {/* BAS */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-600">
        © 2026 <span className="text-orange-400 font-semibold">Nogaye Ycine Sarr</span> — Tous droits réservés
      </div>

    </footer>
  )
}

export default Footer