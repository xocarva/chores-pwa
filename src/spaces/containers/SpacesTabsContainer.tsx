import { Tab, Tabs } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSpaces } from '../hooks';

function SpacesTabsContainer() {
  const { spaces } = useSpaces();
  const navigate = useNavigate();
  const { spaceId } = useParams();

  const handleChange = (_event: React.SyntheticEvent, newSpaceId: string) => {
    navigate(`/spaces/${newSpaceId}`);
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  if (spaces.length === 0) return null;

  return (
    <div style={tabsStyle}>
      <Tabs
        value={spaceId ?? false}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {spaces.map((space) => (
          <Tab key={space.id} label={space.title} value={String(space.id)} />
        ))}
      </Tabs>
    </div>
  );
}

export default SpacesTabsContainer;
