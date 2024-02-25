import { useNavigate } from 'react-router-dom';
import { NavBar } from '../components';
import { useSpaces } from '../hooks';

function SpacesContainer() {
  const { spaces, setActiveSpaceTitle, activeSpaceTitle, setActiveSpaceId } =
    useSpaces();
  const navigate = useNavigate();

  const handleElementClick = (id: number, title: string) => {
    setActiveSpaceId(id);
    setActiveSpaceTitle(title);
    navigate(`/spaces/${id}`);
  };

  return (
    <>
      <NavBar
        title="Espazos"
        addElementLabel="Engadir espazo"
        activeElementTitle={activeSpaceTitle ?? ''}
        elements={spaces}
        onElementClick={handleElementClick}
        onAddElement={() => console.log('Engade Espazo')}
      />
      <div>TasksContainer</div>
    </>
  );
}

export default SpacesContainer;
