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
  userId: number;
  task: Task;
  onEdit: (id: number, task: any) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

function TaskCard({
  userId,
  task,
  onEdit,
  onDelete,
  onComplete,
}: TaskCardProps) {
  const usersOrdered = [
    task.users?.find((user) => user.id === userId),
    ...(task.users?.filter((user) => user.id !== userId) || []),
  ];

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
                  ? `Límite: ${task.date.format('DD/MM/YYYY')}`
                  : 'Sen data límite'
              }
              titleTypographyProps={{
                variant: 'h6',
                color: 'primary.main',
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
            {usersOrdered.map(
              (user) =>
                user && (
                  <Avatar
                    key={user.id}
                    title={user.name}
                    sx={{
                      bgcolor: user.id === userId ? 'primary.main' : undefined,
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                )
            )}
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
              onClick={() =>
                onEdit(task.id, {
                  title: task.title,
                  description: task.description,
                  users: task.users.map((user) => ({ id: user.id })),
                  date: task.date,
                })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="complete"
              title="marcar como completada"
              onClick={() => onComplete(task.id)}
              color="primary"
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
