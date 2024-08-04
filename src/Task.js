import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

function Task({ task, index, handleChecked, r, l }) {
  const labelId = `checkbox-list-label-${task._id}`;
  return (
    <div key={task._id}>
      <ListItem
        key={task._id}
        disablePadding
      >
        <ListItemButton
          role={'button'}
          dense
        >
          <ListItemText id={labelId}>
            {task.complete ? (
              <s style={{ color: 'green' }}>{task.title}</s>
            ) : (
              task.title
            )}
          </ListItemText>
          <ListItemText id={labelId}>
            {l === index ? 'left index ' +  l : ''}
          </ListItemText>
          <ListItemText id={labelId}>
            {r === index ? 'right index ' +  r : ''}
          </ListItemText>

          <ListItemIcon>
            <Checkbox
              edge='start'
              onClick={() => handleChecked(task, index)}
              checked={task.complete}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
        </ListItemButton>
        
      </ListItem>
      <Divider component='li' />
    </div>
  );
}

export default Task;
