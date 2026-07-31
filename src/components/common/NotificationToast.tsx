import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform scale-100">
      <div
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border backdrop-blur-md text-sm font-medium ${
          isSuccess
            ? 'bg-[#034848]/95 text-white border-emerald-400/30'
            : isError
            ? 'bg-rose-900/95 text-white border-rose-400/30'
            : 'bg-slate-900/95 text-white border-slate-700'
        }`}
      >
        {isSuccess && <CheckCircle className="w-5 h-5 text-[#72bf44] shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
