import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { server } from './server';

export default function App() {
  const [count, setCount] = React.useState(0);
  const [envInfo, setEnvInfo] = React.useState<string>('Loading...');

  React.useEffect(() => {
    server.getEnvInfo()
      .then(setEnvInfo)
      .catch((err) => setEnvInfo(`Error: ${err.message}`));
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Vite App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Backend: <strong>{envInfo}</strong>
        </Typography>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
            Count is {count}
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary Action
          </Button>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          This is a standard React + TypeScript + Vite application with Material UI integrated.
        </Typography>
      </Box>
    </Container>
  );
}
