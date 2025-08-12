'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await window.api.auth.signup(form);

      if (res.success) {
        // store token in localStorage
        localStorage.setItem('token', res.token);
        toast.success('Account created successfully!');
        router.push('/login');
      } else {
        toast.error(res.message || 'Signup failed');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <Card className="w-[400px] border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-white text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-gray-300 mb-2">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="bg-gray-800 text-white border-gray-700 "
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an account?{' '}
            <span
              className="text-green-500 hover:underline cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
