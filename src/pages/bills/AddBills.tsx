import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider, useForm } from 'react-hook-form';
import BillForm from './BillForm';
import { Backdrop, CircularProgress, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useBillsStore } from 'services/stores/billStore';
import { Bill, User } from 'types';
import { useEffect, useState } from 'react';
import TabPanel from 'components/common/TabPanel';

const AddBills = ({
  user,
  handleClose,
  open,
}: {
  open: boolean;
  user: User | null;
  handleClose: () => void;
}) => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const { isLoading } = useBillsStore();

  const methods = useForm<Bill>();

  const { setValue } = methods;

  useEffect(() => {
    if (user) {
      setValue('user_id', user.id);
      setValue('user_name', user.name);
    }
  }, [user]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add Bills</DialogTitle>
        <DialogContent>
          <Grid container sx={{ mb: 2 }} spacing={1}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">User</Typography>
              <Typography variant="body1">{user?.name}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Dish Amount</Typography>
              <Typography variant="body1">{user?.dish_amount} /-</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Wifi Amount</Typography>
              <Typography variant="body1">{user?.wifi_amount} /-</Typography>
            </Grid>
          </Grid>

          <Tabs value={tab} onChange={handleChange} centered sx={{ mb: 2 }}>
            <Tab label="Dish" />
            <Tab label="Wifi" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <FormProvider {...methods}>
              <BillForm formId="add_user" type="dish" onComplete={handleClose} />
            </FormProvider>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <FormProvider {...methods}>
              <BillForm formId="add_user" type="wifi" onComplete={handleClose} />
            </FormProvider>
          </TabPanel>

          {/* <FormProvider {...methods}>
            <BillForm formId="add_user" onComplete={handleClose} />
          </FormProvider> */}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="add_user">
            Add
          </Button>
        </DialogActions>{' '}
        <Backdrop sx={{ color: '#fff' }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </>
  );
};

export default AddBills;
