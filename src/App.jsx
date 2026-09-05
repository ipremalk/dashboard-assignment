import { Box } from '@mui/material';
import { FleetDashboard } from '@features/fleet/components/FleetDashboard';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <FleetDashboard />
    </Box>
  );
}

export default App;
