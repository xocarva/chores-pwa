import { useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import { TaskCard } from '../components';
import { useTasks } from '../hooks';
import { useUser } from '../../user';
import { CreateTaskData } from '../schemas';

interface TaskContainerProps {
  onOpenEditModal: () => void;
  setTaskData: React.Dispatch<React.SetStateAction<CreateTaskData | undefined>>;
  setTaskId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function TasksContainer({
  onOpenEditModal,
  setTaskData,
  setTaskId,
}: TaskContainerProps) {
  const { spaceId } = useParams();
  const { tasks, loading } = useTasks(Number(spaceId));
  const { userId } = useUser();

  const handleDelete = (taskId: number) => {
    console.log('Delete task', taskId);
  };

  const handleComplete = (taskId: number) => {
    console.log('Complete task', taskId);
  };

  const handleEdit = (id: number, task: CreateTaskData) => {
    setTaskId(id);
    setTaskData(task);
    onOpenEditModal();
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
      {tasks.map(
        (task) =>
          userId && (
            <TaskCard
              key={task.id}
              userId={userId}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          )
      )}
    </Grid>
  );
}

export default TasksContainer;
