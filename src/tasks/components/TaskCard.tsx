import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AvatarGroup,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
      <Card
        key={task.id}
        sx={{
          ':hover': {
            boxShadow: 6,
            border: 1,
            borderColor: 'primary.main',
          },
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={task.description && <ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <CardHeader
              sx={{ minHeight: '100px' }}
              title={task.title}
              subheader={
                task.date
                  ? `Límite: ${new Date(task.date).toLocaleDateString()}`
                  : 'Sen data límite'
              }
              titleTypographyProps={{
                variant: 'h6',
              }}
            />
          </AccordionSummary>
          {task.description && (
            <AccordionDetails>
              <CardContent>
                <Typography fontStyle="italic">
                  &quot;{task.description}&quot;
                </Typography>
              </CardContent>
            </AccordionDetails>
          )}
        </Accordion>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <AvatarGroup max={3}>
            {task.users.map((user) => (
              <Avatar key={user.id} title={user.name}>
                {user.name[0].toUpperCase()}
              </Avatar>
            ))}
          </AvatarGroup>
          <Box>
            <IconButton
              aria-label="delete"
              title="eliminar"
              onClick={() => onDelete(task.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="settings"
              title="editar"
              onClick={() => onEdit(task.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="complete"
              title="marcar como completada"
              onClick={() => onComplete(task.id)}
            >
              <CheckCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default TaskCard;
