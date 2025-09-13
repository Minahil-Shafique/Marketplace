'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (!email || !mode) {
      router.push('/');
    }
  }, [email, mode, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, mode }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Authentication successful! Redirecting...');
        localStorage.setItem('user', JSON.stringify(data.user));
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email || !mode) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="container">
      <div className="auth-form">
        <h1>Verify OTP</h1>
        <p>Enter the OTP sent to {email}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}