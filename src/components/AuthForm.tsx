'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (step === 1) {
        const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
        const body = mode === 'signup' ? { email, name } : { email };
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        
        if (response.ok) {
          setStep(2);
          setMessage(data.message);
          // In production, you wouldn't show the OTP to the user
          if (data.otp) {
            setMessage(`${data.message} Demo OTP: ${data.otp}`);
          }
        } else {
          setMessage(data.message);
        }
      } else {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp, ...(mode === 'signup' && { name }) }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setMessage('Authentication successful! Redirecting...');
          // Store user data in localStorage (in a real app, use a better method)
          localStorage.setItem('user', JSON.stringify(data.user));
          setTimeout(() => router.push('/dashboard'), 1500);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <>
            {mode === 'signup' && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
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
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="back-button"
            >
              Back
            </button>
          </>
        )}
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}