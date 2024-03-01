import { useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import { TaskCard } from '../components';
import { useTasks } from '../hooks';

function TasksContainer() {
  const { spaceId } = useParams();
  const { tasks, loading } = useTasks(Number(spaceId));

  const handleEdit = (taskId: number) => {
    console.log('Edit task', taskId);
  };

  const handleDelete = (taskId: number) => {
    console.log('Delete task', taskId);
  };

  const handleComplete = (taskId: number) => {
    console.log('Complete task', taskId);
  };

  if (loading)
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );

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
