import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, setOTP } from '@/lib/redis';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    // Check if user exists
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (!user) {
      return NextResponse.json({ message: 'User not found. Please sign up first.' }, { status: 404 });
    }

    // Generate and store OTP
    const otp = await generateOTP();
    await setOTP(email, otp);

    // In a real application, you would send the OTP via email
    // For demo purposes, we'll just return it
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({ 
      message: 'OTP sent to email',
      // Remove this in production - only for demo
      otp 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}