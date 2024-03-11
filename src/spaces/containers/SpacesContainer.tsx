import { AddTask, PostAdd } from '@mui/icons-material';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AddTaskContainer, TasksContainer } from '../../tasks';
import SpacesTabsContainer from './SpacesTabsContainer';
import AddElementSpeedDial from '../../layout/components/AddElementSpeedDial';
import AddSpaceContainer from './AddSpaceContainer';
import { useSpace } from '../hooks';

function SpacesContainer() {
  const { spaceId } = useParams();
  const [openSpaceModal, setOpenSpaceModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const handleOpenSpaceModal = () => setOpenSpaceModal(true);
  const handleCloseSpaceModal = () => setOpenSpaceModal(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);

  const { space } = useSpace(Number(spaceId));

  const actions = [
    { icon: <PostAdd />, name: 'novo espazo', onClick: handleOpenSpaceModal },
  ];

  if (spaceId) {
    actions.push({
      icon: <AddTask />,
      name: 'nova tarefa',
      onClick: handleOpenTaskModal,
    });
  }

  return (
    <>
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
              space={space}
              onCloseModal={handleCloseTaskModal}
            />
          )}
        </div>
      </Modal>
      <SpacesTabsContainer />
      <TasksContainer />
      <AddElementSpeedDial actions={actions} />
    </>
  );
}

export default SpacesContainer;
