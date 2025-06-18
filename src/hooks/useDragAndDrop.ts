// src/hooks/useDragAndDrop.ts
import { useState } from 'react';
import { DragDropData } from '@/types/pool.types';

export function useDragAndDrop(onDrop: (data: DragDropData) => void) {
  const [draggedData, setDraggedData] = useState<{ poolId: string; index: number } | null>(null);

  const handleDragStart = (data: { poolId: string; index: number }) => {
    setDraggedData(data);
  };

  const handleDragEnd = () => {
    setDraggedData(null);
  };

  const handleDrop = (data: DragDropData) => {
    onDrop(data);
  };

  return {
    draggedData,
    handleDragStart,
    handleDragEnd,
    handleDrop
  };
}