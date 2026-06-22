import React, { useState } from 'react'

const QuestionForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ titre, description, tags });
    alert("Question publiée (pas encore connectée au serveur)");
  }

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#F2E8DD] rounded-xl p-8">

        <h1 className="text-xl font-bold text-[#1A1A1A] mb-6">Poser une question</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Titre de la question"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
          />

          <textarea
            placeholder="Décris ton problème..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E] resize-none"
          />

          <input
            type="text"
            placeholder="tags (ex: react,node)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white border border-[#E3D5C5] text-[#1A1A1A] placeholder-[#8C8378] focus:outline-none focus:border-[#B08D6E]"
          />

          <button
            type="submit"
            className="w-full bg-[#B08D6E] text-white font-bold py-3 rounded-lg hover:bg-[#1A1A1A] transition mt-2"
          >
            Publier
          </button>

        </form>
      </div>
    </div>
  )
}

export default QuestionForm