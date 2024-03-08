import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { Done } from '@mui/icons-material';

interface ChoresLogoProps {
  color?: 'primary' | 'white';
  grow?: boolean;
}

function ChoresLogo({ color = 'primary', grow = false }: ChoresLogoProps) {
  return (
    <Stack flexDirection="row" sx={{ flexGrow: grow ? 1 : 0 }}>
      <Typography
        variant="h3"
        color={color}
        sx={{ textDecoration: 'underline' }}
      >
        Chores
      </Typography>
      {color === 'white' ? (
        <Done sx={{ color: 'white' }} fontSize="large" />
      ) : (
        <Done color="primary" fontSize="large" />
      )}
    </Stack>
  );
}

ChoresLogo.propTypes = {
  color: PropTypes.oneOf(['primary', 'white']),
  grow: PropTypes.bool,
};

ChoresLogo.defaultProps = {
  color: 'primary',
  grow: false,
};

export default ChoresLogo;
