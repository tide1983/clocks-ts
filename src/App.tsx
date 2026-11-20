import { useState } from 'react';
import { WorldClockForm } from './components/WorldClockForm';
import { WorldClockList } from './components/WorldClockList';

interface ClockItem {
  id: number;
  name: string;
  offset: number;
}

function App() {
  const [clocks, setClocks] = useState<ClockItem[]>([
    { id: 1, name: 'Moscow', offset: 3 },
    { id: 2, name: 'London', offset: 0 },
  ]);

  const handleAddClock = (name: string, offset: number) => {
    const newClock: ClockItem = {
      id: Date.now(), // Генерация уникального ID
      name,
      offset,
    };
    setClocks([...clocks, newClock]);
  };

  const handleRemoveClock = (id: number) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <WorldClockForm onAdd={handleAddClock} />
      <WorldClockList clocks={clocks} onRemove={handleRemoveClock} />
    </div>
  );
}

export default App;