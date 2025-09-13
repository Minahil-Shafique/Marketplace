import { NextRequest, NextResponse } from 'next/server';
import { getOTP, deleteOTP } from '@/lib/redis';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { email, otp, name } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
  }

  try {
    // Verify OTP
    const storedOTP = await getOTP(email);

    if (!storedOTP || storedOTP.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    if (Date.now() > storedOTP.expires) {
      await deleteOTP(email);
      return NextResponse.json({ message: 'OTP has expired' }, { status: 400 });
    }

    // Check if user exists (for login) or create new user (for signup)
    let user;
    if (name) {
      // Signup flow - create new user
      const { data: newUser, error } = await supabaseAdmin
        .from('users')
        .insert([{ email, name }])
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
      }

      user = newUser;
    } else {
      // Login flow - get existing user
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      user = existingUser;
    }

    // Clean up OTP
    await deleteOTP(email);

    // In a real application, you would create a session or JWT token here
    // For simplicity, we'll just return the user data
    return NextResponse.json({ 
      message: 'Authentication successful', 
      user 
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}