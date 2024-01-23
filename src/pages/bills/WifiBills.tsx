import { Typography } from '@mui/material';
import Bills from './Bills';

const WifiBills = () => {
  return (
    <>
      <Typography variant="h6" textAlign="center" paragraph>
        Wifi Bills
      </Typography>
      <Bills type="wifi" />
    </>
  );
};

export default WifiBills;
