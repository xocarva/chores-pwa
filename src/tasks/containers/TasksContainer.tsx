import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { TaskCard } from '../components';
import { useTasks } from '../hooks';

function TasksContainer() {
  const { spaceId } = useParams();
  const { tasks } = useTasks(Number(spaceId));

  const handleEdit = (taskId: number) => {
    console.log('Edit task', taskId);
  };

  const handleDelete = (taskId: number) => {
    console.log('Delete task', taskId);
  };

  const handleComplete = (taskId: number) => {
    console.log('Complete task', taskId);
  };

  return (
    <Grid container spacing={2} marginTop={2}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      ))}
    </Grid>
  );
}

export default TasksContainer;
