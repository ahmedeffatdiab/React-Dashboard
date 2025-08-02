import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './../../firebase';
import {
  Box, Button, TextField, Snackbar, Alert, Stack, MenuItem,
  Typography,
} from '@mui/material';
import Header from './../../Components/Header';
import useCheckAdmin from '../../utils/checkAdmin';
import Loading from '../Loading/Loading';
export default function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'editor', label: 'Editor' },
  ];

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        contactNumber: Number(formData.contactNumber),
      };
      await addDoc(collection(db, 'Contacts'), payload);

      setOpen(true);
      reset();
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      alert('Failed to save data. Check console for details.');
    }
  };

  const handleClose = (_, reason) => {
    if (reason !== 'clickaway') setOpen(false);
  };
  const isAdmin = useCheckAdmin();
  if (isAdmin === null) {
    return <Loading />
  }
  return (
    <Box>
      <Header title="CREATE USER" subTitle="Create a New User Profile" />
      { isAdmin ?
       <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Stack sx={{ gap: 2, flexDirection: { sm: 'row' } }}>
          <TextField
            label="First Name"
            variant="filled"
            sx={{ flex: 1 }}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register('firstName', { required: 'First Name is required' })}
          />
          <TextField
            label="Age"
            type="number"
            variant="filled"
            sx={{ flex: 1 }}
            error={!!errors.age}
            helperText={errors.age?.message}
            {...register('age', {
              required: 'Age is required',
              min: { value: 1, message: 'Age must be at least 1' },
            })}
          />
        </Stack>

        <TextField
          label="Email"
          variant="filled"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
        />

        <TextField
          label="Password"
          type="password"
          variant="filled"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
        />

        <TextField
          label="Contact Number"
          variant="filled"
          error={!!errors.contactNumber}
          helperText={errors.contactNumber?.message}
          {...register('contactNumber', {
            required: 'Contact Number is required',
            minLength: { value: 10, message: 'Must be at least 10 digits' },
          })}
        />

        <TextField
          label="Address 1"
          variant="filled"
          error={!!errors.address1}
          helperText={errors.address1?.message}
          {...register('address1', { required: 'Address is required' })}
        />

        <TextField
          select
          label="Role"
          defaultValue=""
          variant="filled"
          sx={{ flex: 1 }}
          error={!!errors.role}
          helperText={errors.role?.message}
          {...register('role', { required: 'Role is required' })}
        >
          {roleOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ textAlign: 'right' }}>
          <Button type="submit" variant="contained">
            Create New User
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Account created successfully
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      :<Typography textAlign={'center'} variant="h3" mt={10}>You should be An admin</Typography>
      }
     
    </Box>
  );
}
