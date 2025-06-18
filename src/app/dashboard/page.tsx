// src/app/dashboard/page.tsx
'use client';

import Pool from '@/components/shared/Pool';
import { useEmployeePools } from '@/hooks/useEmployeePools';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

export default function DashboardPage() {
  const { pools, isLoading, error, stats, moveEmployee, clearError } = useEmployeePools();
  const { draggedData, handleDragStart, handleDragEnd, handleDrop } = useDragAndDrop(moveEmployee);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button 
              onClick={clearError}
              className="ml-4 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">配置システム</h1>
          <p className="text-sm text-gray-600 tracking-wider">従業員を異なるラインにドラッグ＆ドロップ</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {pools.slice(0, 2).map(pool => (
            <Pool
              key={pool.id}
              pool={pool}
              draggedData={draggedData}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          ))}
        </div>

        <div className="mb-6">
          {pools[2] && (
            <Pool
              pool={pools[2]}
              draggedData={draggedData}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
            />
          )}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-center items-center gap-8 text-sm text-gray-700">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                <span>出勤</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
                <span>欠勤</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                <span>取り込み中</span>
              </div>
            </div>
            <div className="w-px h-5 bg-gray-300"></div>
            <div className="flex gap-4">
              <span>総人数: {stats.totalEmployees}</span>
              <span>出勤中: {stats.activeEmployees}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}