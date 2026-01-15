
import React, { useState, useEffect, useMemo } from 'react';
import { Recipe, ShoppingItem, DailyPlan } from './types';
import { HomeIcon, CaptureIcon, PlannerIcon, CartIcon } from './components/Icons';
import HomeView from './views/HomeView';
import CaptureView from './views/CaptureView';
import RecipeDetailView from './views/RecipeDetailView';
import PlannerView from './views/PlannerView';
import ShoppingView from './views/ShoppingView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'capture' | 'planner' | 'cart'>('home');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [planner, setPlanner] = useState<DailyPlan[]>([]);
  
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) setRecipes(JSON.parse(savedRecipes));
    const savedPlanner = localStorage.getItem('planner');
    if (savedPlanner) setPlanner(JSON.parse(savedPlanner));
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('planner', JSON.stringify(planner));
  }, [planner]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [recipe, ...prev]);
    setActiveTab('home');
  };

  const updateRecipe = (updated: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    if (selectedRecipeId === id) setSelectedRecipeId(null);
  };

  const openRecipe = (id: string) => {
    setSelectedRecipeId(id);
  };

  const selectedRecipe = useMemo(() => 
    recipes.find(r => r.id === selectedRecipeId), 
    [recipes, selectedRecipeId]
  );

  const renderView = () => {
    if (selectedRecipeId && selectedRecipe) {
      return (
        <RecipeDetailView 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipeId(null)} 
          onUpdate={updateRecipe}
          onDelete={deleteRecipe}
        />
      );
    }

    switch (activeTab) {
      case 'home': return <HomeView recipes={recipes} onOpenRecipe={openRecipe} />;
      case 'capture': return <CaptureView onAddRecipe={addRecipe} />;
      case 'planner': return <PlannerView planner={planner} recipes={recipes} setPlanner={setPlanner} />;
      case 'cart': return <ShoppingView recipes={recipes} />;
      default: return <HomeView recipes={recipes} onOpenRecipe={openRecipe} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#F2F2F7] overflow-hidden relative border-x border-slate-200 shadow-2xl">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderView()}
      </main>

      <nav className="absolute bottom-0 left-0 right-0 h-20 glass border-t border-slate-200/50 flex items-start justify-around px-4 pt-2 z-50">
        <button 
          onClick={() => { setActiveTab('home'); setSelectedRecipeId(null); }}
          className={`flex flex-col items-center justify-center space-y-1 w-full pt-1 ${activeTab === 'home' ? 'text-[#FF9500]' : 'text-[#8E8E93]'}`}
        >
          <HomeIcon active={activeTab === 'home'} className="w-6 h-6" />
          <span className="text-[10px] font-medium">Inicio</span>
        </button>
        <button 
          onClick={() => { setActiveTab('capture'); setSelectedRecipeId(null); }}
          className={`flex flex-col items-center justify-center space-y-1 w-full ${activeTab === 'capture' ? 'text-[#FF9500]' : 'text-[#8E8E93]'}`}
        >
          <div className="bg-[#FF9500] text-white rounded-full p-2.5 -mt-6 shadow-md shadow-[#FF9500]/30 active:scale-90 transition-transform">
            <CaptureIcon className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Capturar</span>
        </button>
        <button 
          onClick={() => { setActiveTab('planner'); setSelectedRecipeId(null); }}
          className={`flex flex-col items-center justify-center space-y-1 w-full pt-1 ${activeTab === 'planner' ? 'text-[#FF9500]' : 'text-[#8E8E93]'}`}
        >
          <PlannerIcon active={activeTab === 'planner'} className="w-6 h-6" />
          <span className="text-[10px] font-medium">Plan</span>
        </button>
        <button 
          onClick={() => { setActiveTab('cart'); setSelectedRecipeId(null); }}
          className={`flex flex-col items-center justify-center space-y-1 w-full pt-1 ${activeTab === 'cart' ? 'text-[#FF9500]' : 'text-[#8E8E93]'}`}
        >
          <CartIcon active={activeTab === 'cart'} className="w-6 h-6" />
          <span className="text-[10px] font-medium">Lista</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
