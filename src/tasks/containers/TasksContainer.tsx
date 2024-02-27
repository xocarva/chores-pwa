import { Grid } from '@mui/material';
import { useTasks } from '../hooks';
import { TaskCard } from '../components';

function TasksContainer() {
  const { tasks } = useTasks();

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
