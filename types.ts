
export type Difficulty = 'básico' | 'intermedio' | 'avanzado';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  checked: boolean;
}

export interface Step {
  id: string;
  instruction: string;
  timerMinutes?: number;
  completed: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  sourceUrl?: string;
  thumbnail: string;
  category: string;
  difficulty: Difficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  notes: string;
  tips: string[];
  tags: string[];
  createdAt: number;
}

export interface ShoppingItem extends Ingredient {
  recipeTitle: string;
}

export interface DailyPlan {
  date: string; // ISO string
  breakfast?: string; // Recipe ID
  lunch?: string; // Recipe ID
  dinner?: string; // Recipe ID
}
