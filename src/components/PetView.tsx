import { STAGE_INFO } from '../constants';
import type { PetState } from '../types';
import { getExpression } from '../expressions';
import { growthStageForLevel } from '../utils/simulation';

export function PetView({ state }: { state: PetState }) {
  const { stats, expressionPackId, expressionId } = state;
  const stage = growthStageForLevel(stats.level);
  const stageInfo = STAGE_INFO[stage];
  const expression = getExpression(expressionPackId, expressionId);
  const isShaking = stats.satiety < 20 || stats.energy < 20;

  return (
    <section className="panel pet-panel">
      <div className="pet-stage">
        <div
          className={`pet-body ${stageInfo.egg ? 'pet-egg' : ''} ${isShaking ? 'pet-shake' : ''}`}
          style={{
            width: stageInfo.size,
            height: stageInfo.size,
            backgroundColor: stageInfo.egg ? '#f2e8d5' : (expression?.color ?? '#9ed17a'),
          }}
        >
          {stageInfo.egg ? (
            <>
              <span className="pet-face">🥚</span>
              <span className="pet-stage-label">蛋</span>
            </>
          ) : expression?.image ? (
            <img
              className="pet-expression-image"
              src={expression.image}
              alt={expression.name}
              draggable={false}
            />
          ) : (
            <span className="pet-face">{expression?.text ?? '🐊'}</span>
          )}
        </div>
      </div>
      <div className="pet-caption">
        {stageInfo.egg ? '小鳄龙还在蛋里，多多互动帮助它孵化吧。' : `小鳄龙 · ${stageInfo.name}`}
        {isShaking && <span className="shake-tip">（状态过低，小鳄龙在发抖）</span>}
      </div>
    </section>
  );
}
