'use client';

import {motion} from 'framer-motion';
import { use, useEffect } from 'react';
import { Employee } from '@/types/employee.types';

interface Props {
    employee: Employee;
    rect: DOMRect;
    onClose: () => void;
}

export default function EmployeeModal({employee, rect, onClose }: Props) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    console.log(window.innerWidth, window.innerHeight);

    const deltaX = centerX - rect.left;
    const deltaY = centerY - rect.top;
    useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      ></div>
      <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3 }}
  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-white rounded-lg shadow-2xl z-50 p-6"
>

      {/* <motion.div
        initial={{ x: rect.left, y: rect.top, scale: 1 }}
        animate={{ x: centerX, y: centerY, scale: 1.5 }}
        exit={{ x: rect.left, y: rect.top, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed w-80 h-60 bg-white rounded-lg shadow-2xl z-50 p-6"
      > */}
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
        <p className="text-gray-600">{employee.position}</p>
        <p className="mt-2 text-sm text-gray-500">{employee.status}</p>
            </div>
      </motion.div>
    </>
  );
}