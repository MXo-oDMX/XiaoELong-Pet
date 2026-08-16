import { SAVE_KEY } from '../constants';
import type { PetState } from '../types';
import { createInitialState } from './simulation';

export function loadState(): PetState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as PetState;
    if (!parsed.stats || typeof parsed.lastSavedAt !== 'number') {
      return createInitialState();
    }
    return parsed;
  } catch {
    return createInitialState();
  }
}

export function saveState(state: PetState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    // 忽略存储失败（隐私模式/容量不足）
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // ignore
  }
}
