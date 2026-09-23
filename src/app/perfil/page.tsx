"use client";
import { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [loja, setLoja] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem('perfil') || '{}');
    if (salvo.nome) setNome(salvo.nome);
    if (salvo.loja) setLoja(salvo.loja);
  }, []);

  const salvar = () => {
    localStorage.setItem('perfil', JSON.stringify({ nome, loja }));
    setMsg('✅ Salvo com sucesso!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="p-5 space-y-6">
      <div className="flex flex-col items-center mt-4">
        <UserCircle size={100} className="text-blue-900 mb-2" />
        <h2 className="text-3xl font-extrabold text-slate-800">Meu Perfil</h2>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200 space-y-5">
        <div>
          <label className="block text-lg font-bold text-slate-700 mb-2">Seu Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Maria" className="w-full border-2 border-slate-300 rounded-xl p-4 text-xl focus:border-blue-900 outline-none" />
        </div>
        <div>
          <label className="block text-lg font-bold text-slate-700 mb-2">Nome do Negócio</label>
          <input type="text" value={loja} onChange={(e) => setLoja(e.target.value)} placeholder="Ex: Mercearia" className="w-full border-2 border-slate-300 rounded-xl p-4 text-xl focus:border-blue-900 outline-none" />
        </div>
        {msg && <p className="text-center text-xl font-bold text-green-600">{msg}</p>}
        <button onClick={salvar} className="w-full bg-blue-900 text-white font-bold text-xl py-4 rounded-xl active:bg-blue-950">Salvar Perfil</button>
      </div>
    </div>
  );
}