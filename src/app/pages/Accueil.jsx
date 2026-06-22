import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';

const Accueil = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const VerificationToken = () => {
        if (token) {
            return navigate('/ajouter_question');
        }
        navigate('/connexion')
    }

    return (
        <div className="w-full min-h-screen bg-[#1A1A1A]">

            <div className="w-full py-10 px-10 flex flex-col items-start gap-2 border-b border-[#3A3A3A]">
                <h1 className="text-2xl font-bold text-[#D9C5B2]">
                    Bienvenue sur <span className="text-white">DevASK</span> 👋
                </h1>
                <p className="text-[#B0A99E] text-sm max-w-xl">
                    Posez vos questions, partagez vos connaissances et progressez avec la communauté des développeurs.
                </p>

                <button
                    onClick={() => VerificationToken()}
                    className="mt-4 bg-[#D9C5B2] text-[#1A1A1A] font-bold px-6 py-2 rounded-lg hover:bg-[#B08D6E] transition"
                >
                    + Poser une question
                </button>
            </div>

            <div className="px-10 py-8">
                <Questions />
            </div>

        </div>
    )
}

export default Accueil