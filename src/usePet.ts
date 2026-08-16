import { useEffect, useState } from 'react';
import {
  ACTIONS,
  EXPRESSION_DURATION_MS,
  EXPRESSION_EXP,
  RANDOM_EVENT_MAX_INTERVAL_MS,
  RANDOM_EVENT_MIN_INTERVAL_MS,
  RANDOM_EVENTS,
  SPECIAL_EXPRESSION_DURATION_MS,
  TICK_MS,
  VIDEO_GAMES,
} from './constants';
import type { PetActionEffect, PetState } from './types';
import { getDefaultExpression } from './expressions';
import { createId } from './utils/id';
import {
  applyEffects,
  createInitialState,
  simulateOffline,
  simulateOnlineTick,
} from './utils/simulation';
import { clearState, loadState, saveState } from './utils/storage';

export function usePet() {
  const [state, setState] = useState<PetState>(() => {
    const loaded = loadState();
    const now = Date.now();
    return simulateOffline(loaded, now);
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setState((prev) => simulateOnlineTick(prev, Date.now()));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    const schedule = () => {
      const delay =
        RANDOM_EVENT_MIN_INTERVAL_MS +
        Math.random() * (RANDOM_EVENT_MAX_INTERVAL_MS - RANDOM_EVENT_MIN_INTERVAL_MS);
      timer = window.setTimeout(() => {
        setState((prev) => applyRandomEvent(prev));
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!state.expressionUntil) return;

    const resetExpression = () => {
      setState((prev) => ({
        ...prev,
        expressionId: getDefaultExpression(prev.expressionPackId)?.id ?? 'smile',
        expressionUntil: null,
      }));
    };

    const remaining = state.expressionUntil - Date.now();
    if (remaining <= 0) {
      resetExpression();
      return;
    }

    const timer = window.setTimeout(resetExpression, remaining);
    return () => window.clearTimeout(timer);
  }, [state.expressionUntil, state.expressionPackId]);

  const performAction = (actionId: string) => {
    setState((prev) => {
      const action = ACTIONS.find((item) => item.id === actionId);
      if (!action) return prev;

      const { stats, leveledUp } = applyEffects(prev.stats, action.effects);
      const levelUpSuffix = leveledUp ? ' 小鳄龙升级了！' : '';
      let text = `${action.name}。${levelUpSuffix}`;
      let nextState: PetState = { ...prev, stats };

      if (action.id === 'play-video-game') {
        const game = VIDEO_GAMES[Math.floor(Math.random() * VIDEO_GAMES.length)];
        text = `打游戏：在玩《${game}》。${levelUpSuffix}`;
      }

      if (action.id === 'feed-noble-steak' && Math.random() < 0.5) {
        nextState = {
          ...nextState,
          expressionPackId: 'matcha',
          expressionId: 'sick',
          expressionUntil: Date.now() + SPECIAL_EXPRESSION_DURATION_MS,
        };
        text = `贵族世家牛排，小鳄龙好像吃坏肚子了，露出生病表情。${levelUpSuffix}`;
      }

      const event: PetState['eventLog'][number] = {
        id: createId(),
        time: Date.now(),
        text,
        kind: 'action' as const,
      };

      return {
        ...nextState,
        eventLog: [event, ...prev.eventLog].slice(0, 50),
      };
    });
  };

  const playExpression = (packId: string, expressionId: string) => {
    setState((prev) => {
      const { stats } = applyEffects(prev.stats, { exp: EXPRESSION_EXP });
      return {
        ...prev,
        stats,
        expressionPackId: packId,
        expressionId,
        expressionUntil: Date.now() + EXPRESSION_DURATION_MS,
      };
    });
  };

  const resetGame = () => {
    clearState();
    setState(createInitialState());
  };

  return {
    state,
    performAction,
    playExpression,
    resetGame,
  };
}

function applyRandomEvent(prev: PetState): PetState {
  const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  const effects: PetActionEffect = event.effects;
  const { stats } = applyEffects(prev.stats, effects);

  return {
    ...prev,
    stats,
    lastRandomEventAt: Date.now(),
    eventLog: [
      {
        id: createId(),
        time: Date.now(),
        text: event.text,
        kind: 'random' as const,
      },
      ...prev.eventLog,
    ].slice(0, 50),
  };
}
