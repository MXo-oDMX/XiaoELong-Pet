import type { PetState } from '../types';

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

export function EventLog({ state }: { state: PetState }) {
  return (
    <section className="panel event-panel">
      <h2>事件记录</h2>
      <ul className="event-list">
        {state.eventLog.slice(0, 12).map((event) => (
          <li key={event.id} className={`event-item event-${event.kind}`}>
            <span className="event-time">{formatTime(event.time)}</span>
            <span className="event-text">{event.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
