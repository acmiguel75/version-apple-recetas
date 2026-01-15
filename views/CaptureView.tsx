
import React, { useState } from 'react';
import { parseRecipeFromUrl } from '../services/geminiService';
import { Recipe } from '../types';

interface CaptureViewProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const CaptureView: React.FC<CaptureViewProps> = ({ onAddRecipe }) => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async () => {
    if (!url.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const parsed = await parseRecipeFromUrl(url);
      if (parsed) onAddRecipe(parsed as Recipe);
    } catch (err) {
      setError("No se pudo procesar. Revisa el enlace.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="px-5 pt-12 h-full flex flex-col">
      <header className="mb-8">
        <h1 className="text-[34px] font-extrabold tracking-tight text-black mb-2">Capturar</h1>
        <p className="text-[17px] text-[#8E8E93] leading-tight">Pega un enlace de TikTok, YouTube o Reels.</p>
      </header>

      <div className="flex-1 flex flex-col pt-4">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-white flex flex-col items-center text-center">
          <div className="bg-[#FF9500]/10 p-5 rounded-full mb-8">
             <svg className="w-10 h-10 text-[#FF9500]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>
          </div>
          
          <input 
            type="text"
            placeholder="URL del video..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isProcessing}
            className="w-full bg-[#F2F2F7] border-none rounded-2xl py-4 px-5 text-[17px] focus:ring-2 focus:ring-[#FF9500] placeholder-[#C7C7CC] mb-6"
          />

          <button
            onClick={handleCapture}
            disabled={isProcessing || !url}
            className={`w-full py-5 rounded-2xl text-[17px] font-bold transition-all ${isProcessing || !url ? 'bg-[#E5E5EA] text-[#C7C7CC]' : 'bg-[#FF9500] text-white shadow-xl shadow-[#FF9500]/30 active:scale-95'}`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Analizando...</span>
              </div>
            ) : 'Extraer Receta'}
          </button>

          {error && <p className="mt-4 text-[#FF3B30] text-[13px] font-semibold">{error}</p>}
        </div>
        
        <div className="mt-12 px-6">
          <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
             </div>
             <p className="text-[13px] text-[#8E8E93] leading-tight">También puedes usar <span className="text-black font-semibold">Compartir</span> en TikTok y elegir esta app.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureView;
