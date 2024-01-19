import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { DOC_PATHS, db } from 'services/firebase';

const AddUser = () => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log({ data });
    const itemsRef = collection(db, DOC_PATHS.USERS);
    try {
      const item = await addDoc(itemsRef, data);
      console.log({ item });

      reset();
      // toast.success('Successfully created.');
      setOpen(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button variant="contained" size="small" onClick={handleClickOpen}>
          Add User
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Name"
                error={!!errors.name}
                helperText={<>{errors.name?.message}</>}
                {...register('name', { required: 'This field is required' })}
              />
              <TextField
                label="Details"
                error={!!errors.details}
                helperText={<>{errors.details?.message}</>}
                {...register('details', { required: 'This field is required' })}
              />
              <TextField
                label="Amount"
                error={!!errors.amount}
                type="number"
                helperText={<>{errors.amount?.message}</>}
                {...register('amount', { required: 'This field is required' })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddUser;
