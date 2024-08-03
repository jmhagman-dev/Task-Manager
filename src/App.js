import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([0, 1, 2, 2, 3, 0, 4, 2]);
  const [r, setR] = useState(0);
  const [l, setL] = useState(0);

  function handleClick() {
    setR(r + 1);
    if (tasks[r] !== 0) {
      [tasks[l], tasks[r]] = [tasks[r], tasks[l]];
      setL(l + 1);
    }
    setTasks(tasks);
  }

  return (
    <div>
      Tasks: {JSON.stringify(tasks)}
      <pre>
        Value of r: {JSON.stringify(r)}{' '}
        {r === tasks.length ? 'end iteration' : ''}
      </pre>
      <button onClick={r < tasks.length ? handleClick : null}>Click</button>
    </div>
  );
}

export default App;
