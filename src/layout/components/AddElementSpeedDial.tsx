import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

interface AddElementSpeedDialProps {
  actions: {
    name: string;
    icon: JSX.Element;
    onClick: () => void;
  }[];
}

function AddElementSpeedDial({ actions }: AddElementSpeedDialProps) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 30, right: 30 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
}

export default AddElementSpeedDial;
