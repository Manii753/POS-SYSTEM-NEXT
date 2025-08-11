'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { FaGoogle, FaFacebookF, FaReceipt } from 'react-icons/fa';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState('');

  const validate = () => {
    if (!form.name.trim()) return toast.error('Name is required');
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return toast.error('Valid email required');
    if (!form.password || form.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    return true;
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setBusy(true);
    try {
      // call electron auth IPC
      const res = await window.api.auth.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.success) {
        // store token and redirect to home
        localStorage.setItem('auth_token', res.token);
        toast.success('Signup successful');
        // small delay to show toast then navigate
        setTimeout(() => {
          window.location.href = '/'; // or use next/router push
        }, 700);
      } else {
        // friendly messages
        if (res.error === 'USER_EXISTS') toast.error('Email already registered');
        else toast.error(res.message || 'Signup failed');
      }
    } catch (err) {
      console.error('signup error', err);
      toast.error('Signup failed (see console)');
    } finally {
      setBusy(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Toaster position="top-center" />
      <SignUpContainer>
        <Card variant="outlined">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaReceipt style={{ fontSize: 28 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Sign up
            </Typography>
          </div>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Jon Snow"
                value={form.name}
                onChange={onChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={onChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={form.password}
                onChange={(e) => { onChange(e); setShowPasswordError(''); }}
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirm">Confirm password</FormLabel>
              <TextField
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••"
                value={form.confirm}
                onChange={onChange}
                required
                fullWidth
              />
            </FormControl>

            <FormControlLabel control={<Checkbox value="updates" />} label="I want to receive updates via email." />

            <Button type="submit" variant="contained" disabled={busy} fullWidth>
              {busy ? 'Creating account...' : 'Sign up'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Stack direction="column" spacing={1}>
        
            <Typography sx={{ textAlign: 'center', mt: 1 }}>
              Already have an account?{' '}
              <Link href="/login" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Card>
      </SignUpContainer>
    </React.Fragment>
  );
}
