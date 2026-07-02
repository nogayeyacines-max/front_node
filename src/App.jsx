import React from 'react'
import Connexion from './app/pages/Connexion';
import Inscription from './app/pages/Inscription';
import UserLayout from './app/layout/UserLayout';
import Accueil from './app/pages/Accueil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profil from './app/pages/Profil';
import Detail from './app/pages/Detail';
import QuestionForm from './app/pages/QuestionForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      children: [
        { path: '/',                      element: <Accueil /> },
        { path: '/connexion',             element: <Connexion /> },
        { path: '/inscription',           element: <Inscription /> },
        { path: '/profil',                element: <Profil /> },
        { path: '/ajouter_question',      element: <QuestionForm /> },
        { path: '/modifier_question/:id', element: <QuestionForm /> },
        { path: '/detail/:id',            element: <Detail /> },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}

export default App