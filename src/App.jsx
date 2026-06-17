import React from 'react'
import Connexion from './app/pages/Connexion';
import Inscription from './app/pages/Inscription';
import UserLayout from './app/layout/UserLayout';
import Accueil from './app/pages/Accueil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profil from './app/pages/Profil';
import Detail from './app/pages/Detail';
import QuestionForm from './app/pages/QuestionForm';


const App = () => {

     const router = createBrowserRouter([
     
   
      //  route de l'accueil
      { path:'/' , element:<UserLayout/> ,

         children :[
               {path:'/' , element:<Accueil/>},
                //  route de la connexion
               {path:'/connexion' , element:<Connexion/>},
               //  route de l'inscription
               {path:'/inscription' , element:<Inscription/>},
                //  route de profil
                 {path:'/profil' , element:<Profil/>},
                //  route de creer question
                 {path:'/ajouter_question' , element:<QuestionForm/>},
                //  route de detail message
               {path:'/detail:id' , element:<Detail/>},
              // {path:'/messages' , element:<Message/>},

        ]
        }





    


     ])


  return (
     <RouterProvider router={router} />
  )
}

export default App
