
import React from 'react';
import { DailyPlan, Recipe } from '../types';

interface PlannerViewProps {
  planner: DailyPlan[];
  recipes: Recipe[];
  setPlanner: React.Dispatch<React.SetStateAction<DailyPlan[]>>;
}

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const PlannerView: React.FC<PlannerViewProps> = ({ planner, recipes, setPlanner }) => {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Planificador Semanal</h1>
        <p className="text-sm text-slate-500">Organiza tus comidas de la semana.</p>
      </header>

      <div className="space-y-6">
        {DAYS.map(day => (
          <div key={day} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">{day}</div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 w-16">Almuerzo</span>
                <select className="flex-1 bg-slate-100 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-orange-500">
                  <option>Seleccionar receta...</option>
                  {recipes.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 w-16">Cena</span>
                <select className="flex-1 bg-slate-100 border-none rounded-xl text-xs py-2 px-3 focus:ring-1 focus:ring-orange-500">
                  <option>Seleccionar receta...</option>
                  {recipes.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerView;
