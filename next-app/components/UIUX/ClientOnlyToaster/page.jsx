import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function ClientOnlyToaster() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Toaster position="top-center" />;
}