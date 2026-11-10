import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isInfo = toast.type === 'info';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md ${
        isError 
          ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
          : isInfo
          ? 'bg-navy-900/90 border-slate-700 text-slate-200'
          : 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
      }`}>
        {isError ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : isInfo ? (
          <Info className="w-5 h-5 text-brand-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <p className="text-xs sm:text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  );
}

