import { ACTIONS } from '../constants';
import type { PetAction } from '../types';

const GROUP_NAMES: Record<PetAction['kind'], string> = {
  feed: '喂食',
  play: '玩耍',
  rest: '休息',
  care: '互动',
};

function formatEffects(action: PetAction): string {
  const parts: string[] = [];
  const map: Array<[keyof PetAction['effects'], string]> = [
    ['satiety', '饱食'],
    ['mood', '情绪'],
    ['energy', '精力'],
    ['intimacy', '亲密'],
    ['exp', '经验'],
  ];

  for (const [key, label] of map) {
    const value = action.effects[key];
    if (value === undefined) continue;
    parts.push(`${value > 0 ? '+' : ''}${value} ${label}`);
  }

  return parts.join(' · ');
}

export function ActionPanel({ onAction }: { onAction: (actionId: string) => void }) {
  const kinds = Object.keys(GROUP_NAMES) as PetAction['kind'][];

  return (
    <section className="panel action-panel">
      <h2>行为</h2>
      {kinds.map((kind) => (
        <div className="action-group" key={kind}>
          <h3>{GROUP_NAMES[kind]}</h3>
          <div className="action-buttons">
            {ACTIONS.filter((action) => action.kind === kind).map((action) => (
              <button
                key={action.id}
                className="action-button"
                title={action.description}
                onClick={() => onAction(action.id)}
              >
                <span className="action-name">{action.name}</span>
                <span className="action-effects">{formatEffects(action)}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
