import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const interval = setInterval(() => {
            setToken(localStorage.getItem("token"));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const Deconnexion = () => {
        localStorage.removeItem("token");
        setToken(null);
        toast.success("Déconnexion réussie !");
        navigate('/');
    }

    return (
        <div className='w-full h-[10vh] flex items-center justify-between px-10 bg-[#1A1A1A]'>

            <NavLink to="/" className="font-bold text-xl text-[#D9C5B2]">
                Nogaye Yacine Sarr
            </NavLink>

            <div className="flex items-center gap-5">

                <NavLink to="/profil" className='text-[#F2E8DD] font-medium hover:text-[#D9C5B2]'>
                    Profil
                </NavLink>

                {token ? (
                    <button
                        onClick={Deconnexion}
                        className="bg-[#D9C5B2] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#B08D6E] transition">
                        Se déconnecter
                    </button>
                ) : (
                    <div className="flex items-center gap-3">
                        <NavLink
                            to="/connexion"
                            className="bg-[#D9C5B2] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#B08D6E] transition">
                            Connexion
                        </NavLink>
                        <NavLink
                            to="/inscription"
                            className="bg-transparent border border-[#D9C5B2] text-[#D9C5B2] px-6 py-2 rounded-lg font-bold hover:bg-[#D9C5B2] hover:text-[#1A1A1A] transition">
                            Inscription
                        </NavLink>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navbar