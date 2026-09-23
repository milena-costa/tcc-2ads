"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, PlusCircle, Trash2, TrendingUp, ShoppingBag } from 'lucide-react';

export default function Home() {
  const [faturamento, setFaturamento] = useState(0);
  const [gastos, setGastos] = useState(0);
  const [vendasQtd, setVendasQtd] = useState(0);
  const [nome, setNome] = useState('');

  const carregarDados = () => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]');
    const gastosSalvos = JSON.parse(localStorage.getItem('gastos') || '[]');
    const perfilSalvo = JSON.parse(localStorage.getItem('perfil') || '{}');
    
    setFaturamento(vendasSalvas.reduce((acc: number, v: any) => acc + v.valor, 0));
    setGastos(gastosSalvos.reduce((acc: number, g: any) => acc + g.valor, 0));
    setVendasQtd(vendasSalvas.length);
    if(perfilSalvo.nome) setNome(perfilSalvo.nome);
  };

  useEffect(() => { carregarDados(); }, []);

  const limparCaixa = () => {
    if(confirm("Deseja realmente apagar todas as vendas e gastos de hoje?")) {
      localStorage.removeItem('vendas');
      localStorage.removeItem('gastos');
      carregarDados();
    }
  };

  const lucro = faturamento - gastos;

  return (
    <div className="p-5 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-blue-900">Olá, {nome || 'Vendedor'}! 👋</h2>
        <p className="text-slate-600 font-medium text-lg">Resumo do seu caixa hoje.</p>
      </div>

      <Link href="/vendas" className="flex items-center justify-center gap-3 w-full bg-blue-900 text-white font-bold text-xl py-5 rounded-2xl shadow-lg active:bg-blue-950">
        <PlusCircle size={32} /> Registrar Venda
      </Link>

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-xl font-bold text-slate-800">Seu Lucro</h3>
        <button onClick={limparCaixa} className="flex items-center gap-1 text-base text-red-600 font-bold bg-red-100 px-3 py-1 rounded-lg">
          <Trash2 size={20} /> Zerar
        </button>
      </div>

      <div className={`p-6 rounded-2xl shadow-md border-2 ${lucro >= 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-4xl font-black ${lucro >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            R$ {lucro.toFixed(2)}
          </h1>
          <DollarSign size={40} className={lucro >= 0 ? 'text-green-600' : 'text-red-600'} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-green-600">
            <TrendingUp size={24} />
            <p className="text-base font-bold text-slate-600">Entrou</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ {faturamento.toFixed(2)}</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">{vendasQtd} vendas</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-red-500">
            <ShoppingBag size={24} />
            <p className="text-base font-bold text-slate-600">Saiu</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">R$ {gastos.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}