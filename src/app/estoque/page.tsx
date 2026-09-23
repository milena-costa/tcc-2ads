"use client";
import { useState, useEffect } from 'react';
import { Package, Trash2, History } from 'lucide-react';

export default function Estoque() {
  const [nome, setNome] = useState('');
  const [custo, setCusto] = useState('');
  const [estoque, setEstoque] = useState<any[]>([]);

  useEffect(() => { 
    const gastosSalvos = JSON.parse(localStorage.getItem('gastos') || '[]');
    setEstoque(gastosSalvos.reverse());
  }, []);

  const salvar = () => {
    if (!nome || !custo) return;
    const novoGasto = { 
      id: Date.now(), 
      nome, 
      valor: parseFloat(custo),
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    
    const gastosAntigos = JSON.parse(localStorage.getItem('gastos') || '[]');
    const listaAtualizada = [...gastosAntigos, novoGasto];
    
    localStorage.setItem('gastos', JSON.stringify(listaAtualizada));
    setEstoque(listaAtualizada.reverse()); 
    setNome(''); 
    setCusto('');
  };

  const apagarGasto = (id: number) => {
    if(confirm("Tem certeza que deseja apagar este registro de reestoque?")) {
      const gastosAntigos = JSON.parse(localStorage.getItem('gastos') || '[]');
      const listaFiltrada = gastosAntigos.filter((g: any) => g.id !== id);
      localStorage.setItem('gastos', JSON.stringify(listaFiltrada));
      setEstoque(listaFiltrada.reverse());
    }
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-3xl font-extrabold text-blue-900 flex items-center gap-2">
        <Package size={32} /> Comprar Estoque
      </h2>
      
      {/* Formulário de Gastos */}
      <div className="bg-slate-200 p-6 rounded-2xl border-2 border-slate-300 space-y-4">
        <p className="text-lg text-slate-800 font-bold mb-2">Registrar Novo Gasto</p>
        <input type="text" placeholder="Nome do Produto" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-4 rounded-xl text-xl outline-none" />
        <input type="number" placeholder="Custo Total (R$)" value={custo} onChange={(e) => setCusto(e.target.value)} className="w-full p-4 rounded-xl text-xl outline-none" />
        <button onClick={salvar} className="w-full bg-slate-800 text-white font-bold text-xl py-4 rounded-xl active:bg-slate-900 mt-2">
          Adicionar Gasto
        </button>
      </div>

      <hr className="border-slate-300" />

      {/* Histórico de Reposição */}
      <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <History size={28} /> Histórico de Reestoque
      </h3>
      
      <div className="space-y-3 pb-10">
        {estoque.length === 0 ? (
          <p className="text-center text-slate-500 font-medium">Nenhum gasto registrado ainda.</p>
        ) : (
          estoque.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border-2 border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg text-slate-800">{item.nome}</h4>
                <p className="text-sm text-slate-500">{item.data} às {item.hora}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-600 font-black text-xl">- R$ {item.valor.toFixed(2)}</span>
                <button onClick={() => apagarGasto(item.id)} className="bg-red-100 p-3 rounded-lg text-red-600 active:bg-red-200">
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