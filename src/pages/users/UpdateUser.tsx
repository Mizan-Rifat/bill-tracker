import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider, useForm } from 'react-hook-form';
import UserForm from './UserForm';
import { User } from 'types';
import { useUsersStore } from 'services/stores/usersStore';
import { Backdrop, CircularProgress } from '@mui/material';

const UpdateUser = ({ user, handleClose }: { user: User | null; handleClose: () => void }) => {
  const methods = useForm();
  const { setValue } = methods;
  const { isLoading } = useUsersStore();
  useEffect(() => {
    if (user) {
      setValue('id', user.id);
      setValue('uuid', user.uuid);
      setValue('name', user.name);
      setValue('details', user.details);
      setValue('amount', user.amount);
    }
  }, [user]);

  return (
    <Dialog open={!!user} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <UserForm formId="update_user" onComplete={handleClose} />
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" form="update_user">
          Update
        </Button>
      </DialogActions>
      <Backdrop sx={{ color: '#fff' }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default UpdateUser;
