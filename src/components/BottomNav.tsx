import Link from 'next/link';
import { Home, ShoppingCart, Package, UserCircle } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-slate-300 pb-2 shadow-2xl z-50">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-2">
        <Link href="/" className="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-blue-900 active:text-blue-900">
          <Home size={28} />
          <span className="text-[13px] font-bold mt-1">Início</span>
        </Link>
        <Link href="/vendas" className="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-blue-900 active:text-blue-900">
          <ShoppingCart size={28} />
          <span className="text-[13px] font-bold mt-1">Vendas</span>
        </Link>
        <Link href="/estoque" className="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-blue-900 active:text-blue-900">
          <Package size={28} />
          <span className="text-[13px] font-bold mt-1">Estoque</span>
        </Link>
        <Link href="/perfil" className="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-blue-900 active:text-blue-900">
          <UserCircle size={28} />
          <span className="text-[13px] font-bold mt-1">Perfil</span>
        </Link>
      </div>
    </nav>
  );
}