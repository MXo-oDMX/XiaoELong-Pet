import { expToNextLevel, growthStageForLevel } from '../utils/simulation';
import { STAGE_INFO } from '../constants';
import type { PetState } from '../types';

const STAT_META = [
  { key: 'satiety', label: '饱食度', color: '#f0a35e' },
  { key: 'mood', label: '情绪值', color: '#e879b8' },
  { key: 'energy', label: '精力', color: '#6bb6e8' },
  { key: 'intimacy', label: '亲密度', color: '#b48ce8' },
] as const;

export function StatusPanel({ state }: { state: PetState }) {
  const { stats } = state;
  const stage = growthStageForLevel(stats.level);
  const stageName = STAGE_INFO[stage].name;
  const need = expToNextLevel(stats.level);
  const expPercent = Math.min(100, Math.round((stats.exp / need) * 100));

  return (
    <section className="panel status-panel">
      <h2>小鳄龙状态</h2>
      <div className="level-line">
        <span className="stage-badge">{stageName}</span>
        <span>Lv.{stats.level}</span>
        <span className="exp-text">
          经验 {Math.floor(stats.exp)}/{need}
        </span>
      </div>
      <div className="exp-bar">
        <div className="exp-bar-fill" style={{ width: `${expPercent}%` }} />
      </div>

      {STAT_META.map(({ key, label, color }) => (
        <div className="stat-row" key={key}>
          <span className="stat-label">{label}</span>
          <div className="stat-bar">
            <div
              className="stat-bar-fill"
              style={{
                width: `${stats[key]}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="stat-value">{Math.round(stats[key])}</span>
        </div>
      ))}
    </section>
  );
}
