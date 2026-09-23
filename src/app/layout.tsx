import type { Metadata } from 'next'
import './globals.css'
import BottomNav from '../components/BottomNav'

export const metadata: Metadata = {
  title: 'Meu Comércio',
  description: 'Controle fácil de vendas e estoque',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="pb-24 bg-slate-50 text-slate-900 font-sans">
        {/* Topo Azul Marinho Fixo */}
        <header className="bg-blue-900 text-white p-5 sticky top-0 z-10 shadow-lg rounded-b-xl">
          <h1 className="text-2xl font-extrabold text-center tracking-wide">Meu Comércio</h1>
        </header>
        
        {/* Conteúdo das Telas */}
        <main className="max-w-md mx-auto min-h-screen">
          {children}
        </main>
        
        {/* Menu Inferior */}
        <BottomNav />
      </body>
    </html>
  )
}