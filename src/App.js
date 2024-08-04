import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { v4 } from 'uuid';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';

function moveComplete(arr) {
  let l = 0;
  for (let r = 0; r < arr.length; r++) {
    if (arr[r].complete !== true) {
      let temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
      l++;
    }
  }
  return arr;
}


function App() {
  const initialTasks = [
    { _id: v4(), title: 'study', complete: true },
    { _id: v4(), title: 'workout', complete: false },
    { _id: v4(), title: 'clean', complete: true },
    { _id: v4(), title: 'run', complete: false },
    { _id: v4(), title: 'pay bills', complete: true },
    { _id: v4(), title: 'laundry', complete: true },
  ]
  const [tasks, setTasks] = useState(initialTasks);

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

  function handleChecked(item, index) {
    const updatedTask = { ...item, complete: !item.complete };
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1, updatedTask);
    setTasks(updatedTasks);
  }

  function moveTasks() {
    const t = [...tasks];
    const updatedTasks = moveComplete(t);
    setTasks(updatedTasks);
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
    <Container maxWidth="fixed">
      <h1>Tasks Manager</h1>
      <List sx={style}>
        {tasks.map((item, i) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <div key={item._id}>
              <ListItem
                key={labelId}
                sx={{ background: 'cream' }}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  dense
                >
                  <ListItemText id={labelId}>
                    {item.complete ? <s style={{color: 'green'}}>{item.title}</s> : item.title}
                  </ListItemText>

                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      onClick={() => handleChecked(item, i)}
                      checked={item.complete}
                      tabIndex={-1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <Divider component='li' />
            </div>
          );
        })}
      </List>
      <div>
        <p>Value of l : {l}</p>

        <p>
          Value of r: {r} {r === tasks.length ? 'end iteration' : ''}
        </p>
      </div>
      <div style={{marginBottom: 20}}>
        <Button
          variant='contained'
          onClick={r < tasks.length ? handleClick : null}
        >
          Iterate
        </Button>
      </div>
      <div style={{marginBottom: 20}}>
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
          onClick={() => {
            setL(0);
            setR(0);
            setTasks(initialTasks);
          }}
        >
          Reset
        </Button>
      </div>
    </Container>
  );
}

export default App;
