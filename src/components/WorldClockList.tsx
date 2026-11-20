import { WorldClock } from './WorldClock';

interface ClockItem {
  id: number;
  name: string;
  offset: number;
}

interface WorldClockListProps {
  clocks: ClockItem[];
  onRemove: (id: number) => void;
}

export function WorldClockList({ clocks, onRemove }: WorldClockListProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {clocks.map((clock) => (
        <WorldClock
          key={clock.id}
          name={clock.name}
          offset={clock.offset}
          onRemove={() => onRemove(clock.id)}
        />
      ))}
    </div>
  );
}