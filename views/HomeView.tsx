
import React, { useState } from 'react';
import { Recipe } from '../types';
import { ClockIcon, ChefIcon } from '../components/Icons';

interface HomeViewProps {
  recipes: Recipe[];
  onOpenRecipe: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ recipes, onOpenRecipe }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = ['Todas', ...new Set(recipes.map(r => r.category))];

  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                         r.ingredients.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'Todas' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-5 pt-12 pb-6">
      <header className="mb-4">
        <h1 className="text-[34px] font-extrabold tracking-tight text-black mb-4">Recetas</h1>
        <div className="relative">
          <input 
            type="text"
            placeholder="Buscar recetas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#E3E3E8] border-none rounded-xl py-2 pl-10 pr-4 text-[17px] focus:ring-0 placeholder-[#8E8E93]"
          />
          <svg className="absolute left-3 top-2.5 w-4.5 h-4.5 text-[#8E8E93]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </header>

      <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-8 -mx-5 px-5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-[#FF9500] text-white' : 'bg-white text-[#FF9500] shadow-sm'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              onClick={() => onOpenRecipe(recipe.id)}
              className="flex flex-col cursor-pointer active:scale-95 transition-transform duration-200"
            >
              <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden mb-2.5 shadow-sm">
                <img src={recipe.thumbnail} alt={recipe.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 glass px-2 py-0.5 rounded-lg text-[10px] font-bold text-black uppercase">
                  {recipe.difficulty}
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-semibold text-black text-[15px] line-clamp-2 leading-tight mb-1">{recipe.title}</h3>
                <div className="flex items-center text-[#8E8E93] text-[12px] font-medium">
                  <ClockIcon className="w-3.5 h-3.5 mr-1" />
                  <span>{recipe.prepTime + recipe.cookTime} min</span>
                  <span className="mx-1.5 opacity-30">•</span>
                  <span>{recipe.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-[#8E8E93]">
          <ChefIcon className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-[17px] font-semibold">Sin recetas</p>
          <p className="text-[14px]">Empieza capturando algo delicioso.</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;
