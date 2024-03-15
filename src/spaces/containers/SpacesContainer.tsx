import { AddTask, PersonAddAlt1Outlined, PostAdd } from '@mui/icons-material';
import { useState } from 'react';
import { FormControlLabel, Modal, Stack, Switch } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AddTaskContainer, CreateTaskData, TasksContainer } from '../../tasks';
import SpacesTabsContainer from './SpacesTabsContainer';
import AddElementSpeedDial from '../../layout/components/AddElementSpeedDial';
import AddSpaceContainer from './AddSpaceContainer';
import { useSpace } from '../hooks';
import { useCreateInvitation } from '../../invitations/hooks';

function SpacesContainer() {
  const { spaceId } = useParams();
  const [taskData, setTaskData] = useState<CreateTaskData>();
  const [taskId, setTaskId] = useState<number>();
  const [hideCompleted, setHideCompleted] = useState(true);
  const [showOnlyUserTasks, setShowOnlyUserTasks] = useState(false);
  const [openSpaceModal, setOpenSpaceModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const handleOpenSpaceModal = () => setOpenSpaceModal(true);
  const handleCloseSpaceModal = () => setOpenSpaceModal(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
    setTaskData(undefined);
    setTaskId(undefined);
  };

  const { space } = useSpace(Number(spaceId));
  const { createInvitation } = useCreateInvitation();

  const actions = [
    { icon: <PostAdd />, name: 'Novo espazo', onClick: handleOpenSpaceModal },
  ];

  if (spaceId) {
    actions.push(
      {
        icon: <AddTask />,
        name: 'Nova tarefa',
        onClick: handleOpenTaskModal,
      },
      {
        icon: <PersonAddAlt1Outlined />,
        name: 'Engadir usuario',
        onClick: () => createInvitation(Number(spaceId)),
      }
    );
  }

  return (
    <Stack mt={3}>
      <Modal
        open={openSpaceModal}
        onClose={handleCloseSpaceModal}
        aria-labelledby="modal-add-space"
        aria-describedby="create-space-form-modal"
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: '24',
            padding: '20px',
            outline: 'none',
            maxWidth: '500px',
            width: '90%',
          }}
        >
          <AddSpaceContainer onCloseModal={handleCloseSpaceModal} />
        </div>
      </Modal>
      <Modal
        open={openTaskModal}
        onClose={handleCloseTaskModal}
        aria-labelledby="modal-add-task"
        aria-describedby="create-task-form-modal"
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: '24',
            padding: '20px',
            outline: 'none',
            maxWidth: '500px',
            width: '90%',
          }}
        >
          {space && (
            <AddTaskContainer
              taskId={taskId}
              taskData={taskData}
              space={space}
              onCloseModal={handleCloseTaskModal}
            />
          )}
        </div>
      </Modal>
      <SpacesTabsContainer />
      {spaceId && (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={hideCompleted}
                onChange={(event) => setHideCompleted(event.target.checked)}
              />
            }
            label="Ocultar completadas"
            sx={{ marginLeft: 2, marginTop: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showOnlyUserTasks}
                onChange={(event) => setShowOnlyUserTasks(event.target.checked)}
              />
            }
            label="Amosar só as asignadas a min"
            sx={{ marginLeft: 2 }}
          />
        </>
      )}
      <TasksContainer
        setTaskData={setTaskData}
        setTaskId={setTaskId}
        onOpenEditModal={handleOpenTaskModal}
        hideCompleted={hideCompleted}
        showOnlyUserTasks={showOnlyUserTasks}
      />
      <AddElementSpeedDial actions={actions} />
    </Stack>
  );
}

export default SpacesContainer;
