import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register as registerUser } from '../../redux/slice/slice.js';
import './login.css';

const LoginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 digits" }),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: { email: '', password: '' },
  });

  const email = watch('email');
  const password = watch('password');
  const isDisabled = !email || !password;

  const onSubmit = (data) => {
    const existingUser = users?.find(u => u.email === data.email && u.password === data.password);
    if (existingUser) {
      dispatch(login(data));
      setSnackbarMessage('Login successful!');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/')
      }, 1200);
    } else {
      setSnackbarMessage('User not registered');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterNavigate = () => {
    navigate('/register');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, gap: 2 }}>
          <FormControl variant="standard">
            <TextField
              label="Email"
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} type="submit" disabled={isDisabled}>
            Login
          </Button>
        </Box>
      </form>

      <div className='register'>
        <p>
          Not Registered <span className='register_link' onClick={handleRegisterNavigate}>Register</span>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbarMessage}
      />
    </div>
  );
}
