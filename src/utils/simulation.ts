import { GROWTH_STAGES, INITIAL_STATS, OFFLINE_PER_MINUTE, ONLINE_TICK_EFFECTS, STAGE_LEVEL_THRESHOLDS, STAT_MAX, STAT_MIN } from '../constants';
import type { GrowthStage, PetActionEffect, PetState, PetStats } from '../types';
import { createId } from './id';

export function clampStat(value: number): number {
  if (Number.isNaN(value)) return STAT_MIN;
  return Math.min(STAT_MAX, Math.max(STAT_MIN, Math.round(value * 10) / 10));
}

export function expToNextLevel(level: number): number {
  return Math.floor(50 + (level - 1) * 30);
}

export function addExp(stats: PetStats, amount: number): { stats: PetStats; leveledUp: boolean } {
  let exp = stats.exp + amount;
  let level = stats.level;
  let leveledUp = false;

  while (exp >= expToNextLevel(level)) {
    exp -= expToNextLevel(level);
    level += 1;
    leveledUp = true;
  }

  return {
    stats: { ...stats, exp: Math.max(0, exp), level },
    leveledUp,
  };
}

export function applyEffects(stats: PetStats, effects: PetActionEffect): { stats: PetStats; leveledUp: boolean } {
  const next = {
    ...stats,
    satiety: clampStat(stats.satiety + (effects.satiety ?? 0)),
    mood: clampStat(stats.mood + (effects.mood ?? 0)),
    energy: clampStat(stats.energy + (effects.energy ?? 0)),
    intimacy: clampStat(stats.intimacy + (effects.intimacy ?? 0)),
  };
  return addExp(next, effects.exp ?? 0);
}

export function growthStageForLevel(level: number): GrowthStage {
  let stage: GrowthStage = 'egg';
  for (const candidate of GROWTH_STAGES) {
    if (level >= STAGE_LEVEL_THRESHOLDS[candidate]) {
      stage = candidate;
    }
  }
  return stage;
}

export function createInitialState(): PetState {
  return {
    stats: { ...INITIAL_STATS },
    expressionPackId: 'matcha',
    expressionId: 'smile',
    expressionUntil: null,
    lastSavedAt: Date.now(),
    lastRandomEventAt: Date.now(),
    eventLog: [
      {
        id: createId(),
        time: Date.now(),
        text: '欢迎回来，小鳄龙正在等你。',
        kind: 'system' as const,
      },
    ],
  };
}

export function simulateOffline(state: PetState, now: number): PetState {
  const elapsedMs = Math.max(0, now - state.lastSavedAt);
  const minutes = elapsedMs / 60_000;
  const { satiety, mood, energy, exp } = OFFLINE_PER_MINUTE;
  const { stats } = applyEffects(state.stats, {
    satiety: satiety * minutes,
    mood: mood * minutes,
    energy: energy * minutes,
    exp: exp * minutes,
  });

  const offlineEvent = minutes >= 1
    ? [
        {
          id: createId(),
          time: now,
          text: `你离开了 ${formatMinutes(minutes)}，小鳄龙自己长大了一些。`,
          kind: 'system' as const,
        },
      ]
    : [];

  return {
    ...state,
    stats,
    lastSavedAt: now,
    eventLog: [...offlineEvent, ...state.eventLog].slice(0, 50),
  };
}

export function simulateOnlineTick(state: PetState, now: number): PetState {
  const { stats } = applyEffects(state.stats, ONLINE_TICK_EFFECTS);
  return {
    ...state,
    stats,
    lastSavedAt: now,
  };
}

function formatMinutes(minutes: number): string {
  if (minutes < 1) return '不到 1 分钟';
  if (minutes < 60) return `${Math.floor(minutes)} 分钟`;
  const hours = Math.floor(minutes / 60);
  const restMinutes = Math.floor(minutes % 60);
  return restMinutes > 0 ? `${hours} 小时 ${restMinutes} 分钟` : `${hours} 小时`;
}
