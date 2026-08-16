import { usePet } from './usePet';
import { ActionPanel } from './components/ActionPanel';
import { EventLog } from './components/EventLog';
import { ExpressionPanel } from './components/ExpressionPanel';
import { PetView } from './components/PetView';
import { StatusPanel } from './components/StatusPanel';
import { growthStageForLevel } from './utils/simulation';

export default function App() {
  const { state, performAction, playExpression, resetGame } = usePet();
  const isEgg = growthStageForLevel(state.stats.level) === 'egg';

  return (
    <main className="app">
      <header className="app-header">
        <h1>小鳄龙养成 v0.1</h1>
        <button className="reset-button" onClick={resetGame} title="清空本地存档并重新开始">
          重置
        </button>
      </header>

      <div className="app-layout">
        <StatusPanel state={state} />
        <div className="main-column">
          <PetView state={state} />
          {isEgg ? (
            <div className="panel egg-hint">
              <h2>孵化中</h2>
              <p>小鳄龙还在蛋里，暂时不能做表情。先好好照顾它，等孵出来再一起玩表情吧。</p>
            </div>
          ) : (
            <ExpressionPanel
              activePackId={state.expressionPackId}
              activeExpressionId={state.expressionId}
              onSelect={playExpression}
            />
          )}
        </div>
        <div className="side-column">
          <ActionPanel onAction={performAction} />
          <EventLog state={state} />
        </div>
      </div>
    </main>
  );
}
