import { useState } from 'react';

interface WorldClockFormProps {
  onAdd: (name: string, offset: number) => void;
}

export function WorldClockForm({ onAdd }: WorldClockFormProps) {
  const [name, setName] = useState<string>('');
  const [offset, setOffset] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || offset === '') return;
    
    // Валидация: проверяем, что введено число
    const numOffset = Number(offset);
    if (isNaN(numOffset)) return;

    onAdd(name, numOffset);
    setName('');
    setOffset('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <div>
        <label>Название</label>
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Временная зона</label>
        <br />
        <input type="number" value={offset} onChange={(e) => setOffset(e.target.value)} required />
      </div>
      <button type="submit" style={{ alignSelf: 'flex-end', height: '25px' }}>Добавить</button>
    </form>
  );
}