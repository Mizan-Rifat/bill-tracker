import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import AppBackdrop from 'components/common/AppBackdrop';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import paths from 'routes/paths';
import { auth } from 'services/firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, data.email, data.password).catch((error) => {
      console.log({ error });
      toast.error(error.message);
    });

    await updateProfile(auth.currentUser, { displayName: data.username }).catch((error) => {
      console.log({ error });
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
              label="Username"
              error={!!errors.username}
              helperText={<>{errors.username?.message}</>}
              {...register('username', {
                required: 'This field is required',
              })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={<>{errors.email?.message}</>}
              {...register('email', { required: 'This field is required' })}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={<>{errors.password?.message}</>}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              error={!!errors.confirm_password}
              helperText={<>{errors.confirm_password?.message}</>}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('confirm_password', {
                required: true,
                validate: (val) => {
                  if (watch('password') != val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
            />
            <Button type="submit">Register</Button>
          </Stack>
        </form>
        <Button variant="outlined" fullWidth sx={{ mt: 1 }} onClick={() => navigate(paths.signin)}>
          go back to login
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
