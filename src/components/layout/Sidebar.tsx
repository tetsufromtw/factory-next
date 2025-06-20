// src/components/layout/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Factory</h2>
        <nav className="space-y-2">
          <Link 
            href="/dashboard" 
            className="block px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            ダッシュボード
          </Link>
        </nav>
      </div>
    </aside>
  );
}