import { AddTask, PostAdd } from '@mui/icons-material';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { TasksContainer } from '../../tasks';
import SpacesTabsContainer from './SpacesTabsContainer';
import AddElementSpeedDial from '../../layout/components/AddElementSpeedDial';
import { useUser } from '../../user';
import { useCreateSpace } from '../hooks/useCreateSpace';
import AddSpaceContainer from './AddSpaceContainer';

function SpacesContainer() {
  const { userId } = useUser();
  const { createSpace } = useCreateSpace();
  const [openSpaceModal, setOpenSpaceModal] = useState(false);
  const handleOpenSpaceModal = () => setOpenSpaceModal(true);
  const handleCloseSpaceModal = () => setOpenSpaceModal(false);

  const handleAddSpace = () => {
    if (userId) {
      createSpace({
        description: 'Unha descripción',
        title: 'Un título',
        users: [{ id: userId, admin: true }],
      });
    }
  };

  const actions = [
    { icon: <AddTask />, name: 'nova tarefa', onClick: handleAddSpace },
    { icon: <PostAdd />, name: 'novo espazo', onClick: handleOpenSpaceModal },
  ];

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
      <SpacesTabsContainer />
      <TasksContainer />
      <AddElementSpeedDial actions={actions} />
    </>
  );
}

export default SpacesContainer;
