import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './register.css'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { register as registerUser } from '../../redux/slice/slice.js'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const RegisterUserSchema = z.object({
    name: z.string().min(3, { message: "Enter valid name" }),
    email: z.string().email({ message: "Enter Valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 digits" })
  .max(20, { message: "Password cannot exceed 20 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character (!@#$%^&*)" }),
})


export default function RegisterForm() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const onSubmit = (data) => {
        const existingUser = users?.find(u => u.email === data.email);
        if (existingUser) {
            setSnackbarMessage('User already exists, please enter different data');
            setSnackbarOpen(true);
        } else {
            dispatch(registerUser(data));
            setSnackbarMessage('Registered successfully!');
            setSnackbarOpen(true);
            setTimeout(() => {
                handleLogin();
            }, 1500);
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterUserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    useEffect(() => {
        console.log(users)
    }, [users])
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 300,
                        gap: 2,
                    }}
                >

                    <FormControl variant="standard">
                        <TextField
                            label="Name"
                            variant="outlined"
                            {...register('name', {required : 'Name is required'})}
                            error={!!errors.name}
                            helperText={errors.name ? errors.name.message : ''}
                        />
                    </FormControl>

                    <FormControl variant="standard">
                        <TextField
                            label="Email"
                            variant="outlined"
                            {...register('email', {required : 'Email is required'})}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ''}
                        />
                    </FormControl>

                    <FormControl variant="standard">
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register('password', {required : 'Password is required'})}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                    </FormControl>

                    <Button variant="contained" sx={{ mt: 2 }} type="submit" >
                        Register
                    </Button>
                </Box>
            </form>

            <div
                className='login'><p>Already Registered <span className='login_link' onClick={handleLogin}>Login</span></p></div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackbarMessage}
            />
        </div>
    );
}
