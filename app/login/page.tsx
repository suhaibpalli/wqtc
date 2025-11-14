'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params?.get('from') ?? '/admin/videos';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        // success -> redirect back
        router.replace(from);
      } else {
        const err = await res.json();
        alert(err.msg || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <label className="block mb-2">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />

        <label className="block mb-2">Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />

        <button disabled={loading} type="submit" className="w-full p-2 bg-[#453142] text-white rounded">
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
