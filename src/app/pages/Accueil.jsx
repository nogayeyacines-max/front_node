import React from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';



const Accueil = () => {
    const token = localStorage.getItem("token");
       const navigate = useNavigate();
   

    const  VerificationToken = () => {
        if(token) {
           return navigate('/ajouter_question');
        }
        navigate('/connexion')
    }


  return (
     <div className="w-full  ">
         <div className="w-full h-[15vh] flex items-center justify-end px-10">
             <NavLink onClick={() => VerificationToken()}  className="text-green-500 font-bold">Ajouter question</NavLink>
         </div>

         {/* composants des question */}
         <Questions></Questions>
    </div>
  )
}

export default Accueil
