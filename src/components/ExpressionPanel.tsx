import { expressionPacks } from '../expressions';
import type { ExpressionPack } from '../types';

interface ExpressionPanelProps {
  activePackId: string;
  activeExpressionId: string;
  onSelect: (packId: string, expressionId: string) => void;
}

export function ExpressionPanel({ activePackId, activeExpressionId, onSelect }: ExpressionPanelProps) {
  const activePack = expressionPacks.find((pack) => pack.id === activePackId) ?? expressionPacks[0];

  return (
    <section className="panel expression-panel">
      <h2>表情包</h2>
      <div className="expression-pack-tabs">
        {expressionPacks.map((pack: ExpressionPack) => (
          <button
            key={pack.id}
            className={`pack-tab ${pack.id === activePackId ? 'active' : ''}`}
            onClick={() => onSelect(pack.id, pack.defaultExpressionId)}
          >
            {pack.name}
          </button>
        ))}
      </div>
      <div className="expression-grid">
        {activePack.expressions.map((expression) => (
          <button
            key={expression.id}
            className={`expression-button ${expression.id === activeExpressionId ? 'active' : ''}`}
            onClick={() => onSelect(activePack.id, expression.id)}
          >
            <span
              className="expression-color"
              style={{ backgroundColor: expression.color }}
            >
              {expression.image ? (
                <img
                  className="expression-thumb"
                  src={expression.image}
                  alt={expression.name}
                  draggable={false}
                />
              ) : (
                expression.text
              )}
            </span>
            <span className="expression-name">{expression.name}</span>
          </button>
        ))}
      </div>
      <p className="expression-tip">点击表情，小鳄龙会展示约 5 秒后回到默认表情。</p>
    </section>
  );
}
