
import React, { useState } from 'react';
import { Recipe, Ingredient, Step } from '../types';
import { ClockIcon, ChefIcon } from '../components/Icons';

interface RecipeDetailViewProps {
  recipe: Recipe;
  onBack: () => void;
  onUpdate: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeDetailView: React.FC<RecipeDetailViewProps> = ({ recipe, onBack, onUpdate, onDelete }) => {
  const [cookingMode, setCookingMode] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const toggleIngredient = (ingId: string) => {
    const updatedIngredients = recipe.ingredients.map(i => 
      i.id === ingId ? { ...i, checked: !i.checked } : i
    );
    onUpdate({ ...recipe, ingredients: updatedIngredients });
  };

  const toggleStep = (stepId: string) => {
    const updatedSteps = recipe.steps.map(s => 
      s.id === stepId ? { ...s, completed: !s.completed } : s
    );
    onUpdate({ ...recipe, steps: updatedSteps });
  };

  if (cookingMode) {
    const currentStep = recipe.steps[activeStepIndex];
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col p-8 animate-in slide-in-from-bottom duration-500">
        <header className="flex justify-between items-center mb-12 pt-4">
          <div className="text-[13px] font-bold text-[#8E8E93] uppercase tracking-widest">Modo Cocina</div>
          <button onClick={() => setCookingMode(false)} className="bg-[#F2F2F7] p-2.5 rounded-full text-black active:scale-90 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[#FF9500] font-bold text-[15px] mb-4 uppercase tracking-tighter">Paso {activeStepIndex + 1} de {recipe.steps.length}</div>
          <h2 className="text-[32px] font-extrabold leading-[1.1] text-black mb-10">
            {currentStep.instruction}
          </h2>
          {currentStep.timerMinutes && (
            <div className="bg-[#F2F2F7] p-6 rounded-[28px] flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <ClockIcon className="w-8 h-8 text-[#FF9500]" />
                </div>
                <span className="text-3xl font-bold tabular-nums">{currentStep.timerMinutes}:00</span>
              </div>
              <button className="bg-[#FF9500] px-8 py-3 rounded-2xl text-white font-bold active:scale-95 transition-transform shadow-lg shadow-[#FF9500]/20">Listo</button>
            </div>
          )}
        </div>

        <footer className="grid grid-cols-2 gap-4 pb-8">
          <button 
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex(prev => prev - 1)}
            className={`py-5 rounded-2xl font-bold text-[17px] ${activeStepIndex === 0 ? 'bg-[#F2F2F7] text-[#C7C7CC]' : 'bg-[#F2F2F7] text-black active:bg-[#E5E5EA]'}`}
          >
            Anterior
          </button>
          <button 
            onClick={() => {
              if (activeStepIndex < recipe.steps.length - 1) {
                setActiveStepIndex(prev => prev + 1);
              } else {
                setCookingMode(false);
              }
            }}
            className="py-5 rounded-2xl font-bold text-[17px] bg-[#FF9500] text-white active:scale-95 transition-transform shadow-lg shadow-[#FF9500]/20"
          >
            {activeStepIndex === recipe.steps.length - 1 ? 'Terminar' : 'Siguiente'}
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F2F7] min-h-screen pb-10">
      <div className="relative h-[300px] overflow-hidden">
        <img src={recipe.thumbnail} alt={recipe.title} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-12 left-5 glass p-2 rounded-full text-black active:scale-90 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={() => { if(confirm('¿Eliminar receta?')) { onDelete(recipe.id); onBack(); } }} className="absolute top-12 right-5 glass p-2 rounded-full text-[#FF3B30] active:scale-90 transition-transform">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
        </button>
      </div>

      <div className="px-5 -mt-8 relative z-10">
        <div className="bg-white rounded-[32px] p-6 shadow-sm mb-6">
          <span className="text-[#FF9500] text-[13px] font-bold uppercase tracking-wide mb-1 block">{recipe.category}</span>
          <h1 className="text-[28px] font-extrabold text-black leading-tight mb-5">{recipe.title}</h1>
          
          <div className="flex justify-between border-t border-slate-100 pt-5">
            <div className="flex flex-col items-center flex-1">
              <span className="text-[11px] text-[#8E8E93] uppercase font-bold mb-1">Rinde</span>
              <span className="text-[17px] font-bold">{recipe.servings} raciones</span>
            </div>
            <div className="w-[1px] bg-slate-100 h-10 self-center mx-4"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[11px] text-[#8E8E93] uppercase font-bold mb-1">Tiempo</span>
              <span className="text-[17px] font-bold">{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="w-[1px] bg-slate-100 h-10 self-center mx-4"></div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-[11px] text-[#8E8E93] uppercase font-bold mb-1">Nivel</span>
              <span className="text-[17px] font-bold capitalize">{recipe.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="text-[20px] font-bold text-black">Ingredientes</h2>
            <button className="text-[#FF9500] font-semibold text-[15px]">Editar</button>
          </div>
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
            {recipe.ingredients.map((ing, idx) => (
              <label 
                key={ing.id} 
                className={`flex items-center px-5 py-4 cursor-pointer active:bg-slate-50 transition-colors ${idx !== recipe.ingredients.length - 1 ? 'border-b border-[#F2F2F7]' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={ing.checked}
                  onChange={() => toggleIngredient(ing.id)}
                  className="w-6 h-6 rounded-full border-2 border-[#C7C7CC] text-[#FF9500] focus:ring-0 mr-4" 
                />
                <div className="flex flex-1 justify-between items-center">
                  <span className={`text-[17px] ${ing.checked ? 'text-[#C7C7CC] line-through' : 'text-black font-medium'}`}>{ing.name}</span>
                  <span className="text-[15px] text-[#8E8E93] font-semibold">{ing.amount} {ing.unit}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="flex justify-between items-center mb-3 px-2">
            <h2 className="text-[20px] font-bold text-black">Preparación</h2>
            <button 
              onClick={() => setCookingMode(true)}
              className="text-white font-bold text-[14px] bg-[#FF9500] px-4 py-2 rounded-full shadow-lg shadow-[#FF9500]/20 active:scale-95 transition-transform"
            >
              Modo Cocina
            </button>
          </div>
          <div className="space-y-4">
            {recipe.steps.map((step, index) => (
              <div 
                key={step.id} 
                onClick={() => toggleStep(step.id)}
                className={`bg-white p-5 rounded-[24px] shadow-sm flex space-x-4 active:scale-[0.98] transition-transform ${step.completed ? 'opacity-50' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] ${step.completed ? 'bg-[#34C759] text-white' : 'bg-[#FF9500]/10 text-[#FF9500]'}`}>
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className={`text-[16px] leading-[1.4] ${step.completed ? 'text-[#8E8E93] line-through' : 'text-black'}`}>
                    {step.instruction}
                  </p>
                  {step.timerMinutes && (
                    <div className="mt-2.5 inline-flex items-center space-x-1.5 text-[#FF9500] text-[13px] font-bold bg-[#FF9500]/5 px-2.5 py-1 rounded-lg">
                       <ClockIcon className="w-3.5 h-3.5" />
                       <span>{step.timerMinutes} min</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailView;
