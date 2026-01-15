
import React from 'react';
import { Recipe, Ingredient } from '../types';

interface ShoppingViewProps {
  recipes: Recipe[];
}

const ShoppingView: React.FC<ShoppingViewProps> = ({ recipes }) => {
  // Aggregate all unchecked ingredients from all recipes
  const shoppingItems = recipes.flatMap(recipe => 
    recipe.ingredients
      .filter(ing => !ing.checked)
      .map(ing => ({ ...ing, recipeTitle: recipe.title }))
  );

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Lista de Compras</h1>
        <p className="text-sm text-slate-500">Ingredientes que te faltan para tus recetas guardadas.</p>
      </header>

      {shoppingItems.length > 0 ? (
        <div className="space-y-4">
          {shoppingItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">{item.name}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Para: {item.recipeTitle}</span>
              </div>
              <div className="bg-orange-50 px-3 py-1 rounded-xl text-orange-600 font-bold text-xs">
                {item.amount} {item.unit}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
           <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
           <p className="text-sm">¡Tu despensa parece estar llena!</p>
           <p className="text-xs">O no has marcado ingredientes faltantes aún.</p>
        </div>
      )}
      
      <div className="mt-12 bg-slate-100 p-6 rounded-[32px] text-center">
        <p className="text-xs text-slate-500 mb-4 italic">"Comer bien es una forma de respetarse a uno mismo"</p>
        <button className="bg-slate-800 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg">Exportar Lista (PDF)</button>
      </div>
    </div>
  );
};

export default ShoppingView;
