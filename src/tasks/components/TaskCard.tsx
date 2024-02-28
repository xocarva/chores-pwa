import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../api';

interface TaskCardProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

function TaskCard({ task, onEdit, onDelete, onComplete }: TaskCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
      <Card>
        <CardHeader
          avatar={task.users.map((user) => (
            <Avatar key={user.id} title={user.name}>
              {user.name[0].toUpperCase()}
            </Avatar>
          ))}
          action={
            <IconButton
              aria-label="settings"
              title="editar"
              onClick={() => onEdit(task.id)}
            >
              <EditIcon />
            </IconButton>
          }
          title={task.title}
          subheader={`Límite: ${
            task.date
              ? new Date(task.date).toLocaleDateString()
              : 'No especificada'
          }`}
          titleTypographyProps={{ variant: 'h5' }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Usuarios asignados: {task.users.map((user) => user.name).join(', ')}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="complete"
            title="marcar como completada"
            onClick={() => onComplete(task.id)}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            title="eliminar"
            onClick={() => onDelete(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TaskCard;
