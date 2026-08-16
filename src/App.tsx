import { usePet } from './usePet';
import { ActionPanel } from './components/ActionPanel';
import { EventLog } from './components/EventLog';
import { ExpressionPanel } from './components/ExpressionPanel';
import { PetView } from './components/PetView';
import { StatusPanel } from './components/StatusPanel';

export default function App() {
  const { state, performAction, playExpression, resetGame } = usePet();

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
          <ExpressionPanel
            activePackId={state.expressionPackId}
            activeExpressionId={state.expressionId}
            onSelect={playExpression}
          />
        </div>
        <div className="side-column">
          <ActionPanel onAction={performAction} />
          <EventLog state={state} />
        </div>
      </div>
    </main>
  );
}
