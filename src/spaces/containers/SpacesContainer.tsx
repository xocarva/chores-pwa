import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../core';
import { TasksContainer } from '../../tasks';
import { useSpaces } from '../hooks';
import { useUser } from '../../user';
import { useCreateSpace } from '../hooks/useCreateSpace';

function SpacesContainer() {
  const { spaces, setActiveSpaceTitle, activeSpaceTitle } = useSpaces();
  const { createSpace } = useCreateSpace();
  const { userId } = useUser();
  const navigate = useNavigate();

  const handleElementClick = (id: number, title: string) => {
    setActiveSpaceTitle(title);
    navigate(`/spaces/${id}`);
  };

  const handleAddSpace = () => {
    if (userId) {
      createSpace({
        description: 'Unha descripción',
        title: 'Un título',
        users: [{ id: userId, admin: true }],
      });
    }
  };

  return (
    <>
      <NavBar
        title="Espazos"
        addElementLabel="Engadir espazo"
        activeElementTitle={activeSpaceTitle ?? ''}
        elements={spaces}
        onElementClick={handleElementClick}
        onAddElement={handleAddSpace}
      />
      <TasksContainer />
    </>
  );
}

export default SpacesContainer;
