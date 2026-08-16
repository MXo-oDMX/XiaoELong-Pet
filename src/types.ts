export type GrowthStage = 'egg' | 'baby' | 'teen' | 'adult';

export type StatKey = 'satiety' | 'mood' | 'energy' | 'intimacy';

export interface PetStats {
  satiety: number;
  mood: number;
  energy: number;
  intimacy: number;
  exp: number;
  level: number;
}

export interface PetEvent {
  id: string;
  time: number;
  text: string;
  kind: 'action' | 'random' | 'system';
}

export interface PetState {
  stats: PetStats;
  expressionPackId: string;
  expressionId: string;
  expressionUntil: number | null;
  lastSavedAt: number;
  lastRandomEventAt: number;
  eventLog: PetEvent[];
}

export interface PetActionEffect {
  satiety?: number;
  mood?: number;
  energy?: number;
  intimacy?: number;
  exp?: number;
}

export interface PetAction {
  id: string;
  name: string;
  description: string;
  effects: PetActionEffect;
  kind: 'feed' | 'play' | 'rest' | 'care';
}

export interface ExpressionItem {
  id: string;
  name: string;
  /** v0.1 先用色块/文字占位，后续可替换为图片路径 */
  color: string;
  text: string;
  /** 后续支持：image?: string; sprite?: { src: string; x: number; y: number; width: number; height: number } */
  image?: string;
  sprite?: {
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ExpressionPack {
  id: string;
  name: string;
  /** 默认表情 id */
  defaultExpressionId: string;
  expressions: ExpressionItem[];
}
