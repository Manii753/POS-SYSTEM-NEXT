'use client';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import toast, { Toaster } from 'react-hot-toast';
import { FaReceipt } from 'react-icons/fa';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '420px',
  },
}));

const Container = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [remember, setRemember] = useState(true);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Fill all fields');

    setBusy(true);
    try {
      const res = await window.api.auth.login({ email: form.email, password: form.password });
      if (res.success) {
        // store token locally
        if (remember) localStorage.setItem('auth_token', res.token);
        else sessionStorage.setItem('auth_token', res.token);
        toast.success('Logged in');
        setTimeout(() => {
          window.location.href = '/'; // or router.push('/')
        }, 500);
      } else {
        if (res.error === 'INVALID_CREDENTIALS') toast.error('Invalid email or password');
        else toast.error(res.message || 'Login failed');
      }
    } catch (err) {
      console.error('login error', err);
      toast.error('Login failed (see console)');
    } finally {
      setBusy(false);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Toaster position="top-center" />
      <Container>
        <Card variant="outlined">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaReceipt style={{ fontSize: 28 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Sign in
            </Typography>
          </div>

          <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" name="email" value={form.email} onChange={onChange} required fullWidth />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={onChange} required fullWidth />
            <FormControlLabel control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />} label="Remember me" />

            <Button type="submit" variant="contained" disabled={busy} fullWidth>
              {busy ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between">
            <Link href="/signup">Create account</Link>
            <Link href="#">Forgot password?</Link>
          </Stack>
        </Card>
      </Container>
    </React.Fragment>
  );
}
