import { Typography } from '@mui/material';
import Bills from './Bills';

const DishBills = () => {
  return (
    <>
      <Typography variant="h6" textAlign="center" paragraph>
        Dish Bills
      </Typography>
      <Bills type="dish" />
    </>
  );
};

export default DishBills;
