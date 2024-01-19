import { Box, Button, Stack, TextField } from '@mui/material';
import AppBackdrop from 'components/common/AppBackdrop';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from 'routes/paths';
import { auth } from 'services/firebase';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      toast.error(error.message);
    });
    setLoading(false);
  };

  return (
    <>
      <AppBackdrop open={loading} />

      <Box sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={<>{errors.email?.message}</>}
              {...register('email', { required: 'This field is required' })}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={<>{errors.password?.message}</>}
              {...register('password', {
                required: 'This field is required',
              })}
            />
            <Button type="submit">Login</Button>
          </Stack>
        </form>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate(paths.signup)}
        >
          Register
        </Button>
      </Box>
    </>
  );
};

export default SignIn;
