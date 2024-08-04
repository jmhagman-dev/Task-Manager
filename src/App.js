import React, { useState } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Task from './Task';
import { v4 } from 'uuid';
import TextField from '@mui/material/TextField';

function moveComplete(arr) {
  let l = 0;
  let r = 0;
  while (r < arr.length) {
    if (arr[r].complete !== true) {
      let temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
      l++;
      r++;
    }
    r++;
  }
  return { arr, r, l };
}

function App() {
  const initialTasks = [
    { _id: v4(), title: 'study', complete: true },
    { _id: v4(), title: 'workout', complete: false },
    { _id: v4(), title: 'clean', complete: true },
    { _id: v4(), title: 'run', complete: false },
    { _id: v4(), title: 'pay bills', complete: true },
    { _id: v4(), title: 'laundry', complete: true },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitleValue, setTaskTitleValue] = useState('');
  const [r, setR] = useState(0);
  const [l, setL] = useState(0);

  function handleClick() {
    const updatedTasks = [...tasks];
    setR(r + 1);

    if (updatedTasks[r].complete !== true) {
      let temp = updatedTasks[l];
      updatedTasks[l] = updatedTasks[r];
      updatedTasks[r] = temp;
      setL(l + 1);
    }

    setTasks(updatedTasks);
  }

  function handleChange(event) {
    setTaskTitleValue(event.target.value);
  }

  function addTask(title) {
    const newTask = { _id: v4(), title, complete: false };
    setTasks([newTask, ...tasks]);
    setTaskTitleValue('');
  }

  function handleChecked(item, index) {
    const updatedTask = { ...item, complete: !item.complete };
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1, updatedTask);
    setTasks(updatedTasks);
  }

  function moveTasks() {
    const { arr, l, r } = moveComplete([...tasks]);
    setL(l)
    setR(r)
    setTasks(arr);
  }

  function reset() {
    setL(0);
    setR(0);
    setTasks(initialTasks);
  }

  const style = {
    py: 0,
    width: '100%',
    maxWidth: 350,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  return (
    <Container maxWidth='fixed'>
      <h1>Tasks Manager</h1>
      <TextField
        sx={{ marginRight: 10, marginBottom: 10 }}
        variant='outlined'
        type='text'
        id='task-input'
        onChange={handleChange}
        value={taskTitleValue}
      />
      <Button
        variant='contained'
        onClick={() => addTask(taskTitleValue)}
      >
        Add Task
      </Button>
      <List sx={style}>
        {tasks.map((task, i) => {
          return (
            <Task
              key={task._id}
              handleChecked={handleChecked}
              task={task}
              index={i}
              r={r}
              l={l}
            />
          );
        })}
      </List>
      <div>
        <p>Value of l : {l}</p>

        <p>
          Value of r: {r} {r === tasks.length ? 'end iteration' : ''}
        </p>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button
          variant='contained'
          onClick={r < tasks.length ? handleClick : null}
        >
          Iterate
        </Button>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button
          variant='contained'
          onClick={moveTasks}
        >
          Move Tasks
        </Button>
      </div>
      <div>
        <Button
          variant='contained'
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </Container>
  );
}

export default App;
