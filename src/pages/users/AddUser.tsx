import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProvider, useForm } from 'react-hook-form';
import UserForm from './UserForm';
import { useUsersStore } from 'services/stores/usersStore';
import { Backdrop, CircularProgress } from '@mui/material';

const AddUser = () => {
  const { openAddModal, setOpenModal, isLoading } = useUsersStore();

  const methods = useForm();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openAddModal} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <FormProvider {...methods}>
            <UserForm formId="add_user" onComplete={handleClose} />
          </FormProvider>
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

export default AddUser;
