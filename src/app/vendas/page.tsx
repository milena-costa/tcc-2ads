"use client";
import { useState, useEffect } from 'react';
import { History, Trash2, ShoppingCart } from 'lucide-react';

export default function Vendas() {
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');
  const [msg, setMsg] = useState('');
  const [historico, setHistorico] = useState<any[]>([]);

  // Carrega o histórico ao abrir a tela
  useEffect(() => {
    const vendasSalvas = JSON.parse(localStorage.getItem('vendas') || '[]');
    // Inverte a lista para mostrar a venda mais recente no topo
    setHistorico(vendasSalvas.reverse());
  }, []);

  const salvar = () => {
    if (!produto || !valor) { setMsg('❌ Preencha todos os campos!'); return; }
    
    const novaVenda = { 
      id: Date.now(), 
      produto, 
      valor: parseFloat(valor),
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    const vendasAntigas = JSON.parse(localStorage.getItem('vendas') || '[]');
    const listaAtualizada = [...vendasAntigas, novaVenda];
    
    localStorage.setItem('vendas', JSON.stringify(listaAtualizada));
    setHistorico(listaAtualizada.reverse());
    setProduto(''); 
    setValor('');
    setMsg('✅ Venda Registrada!');
    setTimeout(() => setMsg(''), 3000);
  };

  const apagarVenda = (id: number) => {
    if(confirm("Tem certeza que deseja apagar esta venda?")) {
      const vendasAntigas = JSON.parse(localStorage.getItem('vendas') || '[]');
      const listaFiltrada = vendasAntigas.filter((v: any) => v.id !== id);
      localStorage.setItem('vendas', JSON.stringify(listaFiltrada));
      setHistorico(listaFiltrada.reverse());
    }
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-900 flex items-center gap-2">
        <ShoppingCart size={32} /> Nova Venda
      </h2>
      
      {/* Formulário de Registro */}
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200 space-y-5">
        <div>
          <label className="block text-lg font-bold text-slate-700 mb-2">Produto Vendido</label>
          <input type="text" value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Ex: Arroz 5kg" className="w-full border-2 border-slate-300 rounded-xl p-4 text-xl focus:border-blue-900 outline-none" />
        </div>
        <div>
          <label className="block text-lg font-bold text-slate-700 mb-2">Valor Total (R$)</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0.00" className="w-full border-2 border-slate-300 rounded-xl p-4 text-xl focus:border-blue-900 outline-none" />
        </div>
        {msg && <p className="text-center text-xl font-bold text-green-600">{msg}</p>}
        <button onClick={salvar} className="w-full bg-blue-900 text-white font-bold text-xl py-4 rounded-xl active:bg-blue-950">Confirmar Venda</button>
      </div>

      <hr className="border-slate-300" />

      {/* Histórico de Vendas */}
      <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <History size={28} /> Histórico de Vendas
      </h3>
      
      <div className="space-y-3 pb-10">
        {historico.length === 0 ? (
          <p className="text-center text-slate-500 font-medium">Nenhuma venda registrada ainda.</p>
        ) : (
          historico.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border-2 border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg text-slate-800">{item.produto}</h4>
                <p className="text-sm text-slate-500">{item.data} às {item.hora}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-green-700 font-black text-xl">R$ {item.valor.toFixed(2)}</span>
                <button onClick={() => apagarVenda(item.id)} className="bg-red-100 p-3 rounded-lg text-red-600 active:bg-red-200">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}