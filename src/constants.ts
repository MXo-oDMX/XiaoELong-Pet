import type { GrowthStage, PetAction, PetStats } from './types';

export const SAVE_KEY = 'xiaoelong-pet:save:v0.1';

export const EXPRESSION_DURATION_MS = 5_000;
export const EXPRESSION_EXP = 2;
export const SPECIAL_EXPRESSION_DURATION_MS = 30_000;

export const VIDEO_GAMES = [
  '元气骑士',
  '原神',
  '崩坏星穹铁道',
  'Isaac',
  '三国杀',
  '雀魂',
  '导师模拟器',
  'UNO',
] as const;

export const STAT_MIN = 0;
export const STAT_MAX = 100;

export const GROWTH_STAGES: GrowthStage[] = ['egg', 'baby', 'teen', 'adult'];

/** 到达下一成长阶段所需的最低等级 */
export const STAGE_LEVEL_THRESHOLDS: Record<GrowthStage, number> = {
  egg: 1,
  baby: 2,
  teen: 4,
  adult: 7,
};

export const STAGE_INFO: Record<GrowthStage, { name: string; size: number; egg?: boolean }> = {
  egg: { name: '蛋', size: 84, egg: true },
  baby: { name: '幼年', size: 110 },
  teen: { name: '少年', size: 150 },
  adult: { name: '成年', size: 200 },
};

export const INITIAL_STATS: PetStats = {
  satiety: 70,
  mood: 70,
  energy: 80,
  intimacy: 0,
  exp: 0,
  level: 1,
};

/** 在线模拟：每 5 秒变化 */
export const TICK_MS = 5_000;
export const ONLINE_TICK_EFFECTS = {
  satiety: -0.25,
  mood: -0.15,
  energy: -0.2,
  exp: 0.1,
};

/** 离线成长：每离线 1 分钟 */
export const OFFLINE_PER_MINUTE = {
  satiety: -0.6,
  mood: -0.3,
  energy: -0.4,
  exp: 0.25,
};

export const RANDOM_EVENT_MIN_INTERVAL_MS = 25_000;
export const RANDOM_EVENT_MAX_INTERVAL_MS = 60_000;

export const ACTIONS: PetAction[] = [
  {
    id: 'feed-fish',
    name: '喂小鱼干',
    description: '补充饱食度，小鳄龙很喜欢。',
    kind: 'feed',
    effects: { satiety: 18, mood: 3, exp: 4, intimacy: 1 },
  },
  {
    id: 'feed-berry',
    name: '喂能量果',
    description: '补充饱食和精力，口感清爽。',
    kind: 'feed',
    effects: { satiety: 12, energy: 6, mood: 2, exp: 5 },
  },
  {
    id: 'feed-cake',
    name: '喂草莓蛋糕',
    description: '甜食能大幅提升情绪，但不算顶饱。',
    kind: 'feed',
    effects: { satiety: 8, mood: 12, exp: 3, intimacy: 1 },
  },
  {
    id: 'feed-four-fruit-soup',
    name: '四果汤',
    description: '清爽的闽南糖水，补充饱食和情绪。',
    kind: 'feed',
    effects: { satiety: 16, mood: 5, exp: 5 },
  },
  {
    id: 'feed-shaoxuan-grass',
    name: '劭轩草',
    description: '原型是烧仙草，Q弹清甜，小鳄龙很喜欢。',
    kind: 'feed',
    effects: { satiety: 14, mood: 4, energy: 3, exp: 5 },
  },
  {
    id: 'feed-noble-steak',
    name: '贵族世家牛排',
    description: '豪华大餐，数值很高；但有 50% 概率吃坏肚子。',
    kind: 'feed',
    effects: { satiety: 35, mood: 10, energy: 5, intimacy: 3, exp: 8 },
  },
  {
    id: 'play-ball',
    name: '玩球',
    description: '消耗精力，提升情绪和亲密度。',
    kind: 'play',
    effects: { energy: -8, mood: 9, intimacy: 4, exp: 6 },
  },
  {
    id: 'play-tickle',
    name: '挠痒痒',
    description: '让小鳄龙开心得扭来扭去。',
    kind: 'play',
    effects: { energy: -3, mood: 7, intimacy: 6, exp: 4 },
  },
  {
    id: 'play-video-game',
    name: '打游戏',
    description: '随机打开游戏库中的一款游戏，快乐摸鱼。',
    kind: 'play',
    effects: { energy: -8, mood: 10, intimacy: 2, exp: 6 },
  },
  {
    id: 'play-pingpong',
    name: '打乒乒球',
    description: '轻快的有氧运动，比较消耗精力。',
    kind: 'play',
    effects: { energy: -14, mood: 8, intimacy: 2, exp: 6 },
  },
  {
    id: 'play-beach-volleyball',
    name: '打沙滩排球',
    description: '阳光沙滩运动，精力消耗较大。',
    kind: 'play',
    effects: { energy: -18, mood: 10, intimacy: 2, exp: 7 },
  },
  {
    id: 'play-dinggel',
    name: '丁格尔丁',
    description: '不明觉厉的体育运动，非常消耗精力。',
    kind: 'play',
    effects: { energy: -22, mood: 10, intimacy: 2, exp: 8 },
  },
  {
    id: 'nap',
    name: '小睡一会儿',
    description: '恢复精力，心情平静。',
    kind: 'rest',
    effects: { energy: 25, mood: 2, satiety: -1, exp: 2 },
  },
  {
    id: 'deep-sleep',
    name: '好好睡一觉',
    description: '大幅恢复精力，需要一点时间。',
    kind: 'rest',
    effects: { energy: 50, mood: 3, satiety: -2, exp: 3 },
  },
  {
    id: 'pat',
    name: '摸摸头',
    description: '温柔抚摸，增进感情。',
    kind: 'care',
    effects: { mood: 5, intimacy: 8, exp: 2 },
  },
];

export const RANDOM_EVENTS = [
  {
    text: '小鳄龙打翻了饭盆，饱食度下降了一点。',
    effects: { satiety: -8, mood: -2 },
  },
  {
    text: '小鳄龙在沙发上跳来跳去，精力下降但心情很好。',
    effects: { energy: -6, mood: 6 },
  },
  {
    text: '小鳄龙发现了一颗糖果，情绪值提高了。',
    effects: { mood: 7 },
  },
  {
    text: '小鳄龙追着自己的尾巴转圈圈。',
    effects: { energy: -4, mood: 4, exp: 2 },
  },
  {
    text: '小鳄龙安静地趴了一会儿，精力恢复了一些。',
    effects: { energy: 6, mood: 1 },
  },
  {
    text: '小鳄龙用湿漉漉的眼睛看着你，亲密度增加了。',
    effects: { intimacy: 4, mood: 2 },
  },
];
