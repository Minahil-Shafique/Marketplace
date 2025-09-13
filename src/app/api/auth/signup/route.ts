import { NextRequest, NextResponse } from "next/server";
import { generateOTP, setOTP } from "@/lib/redis";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email || !name) {
    return NextResponse.json(
      { message: "Email and name are required" },
      { status: 400 }
    );
  }

  try {
    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Generate and store OTP
    const otp = await generateOTP();
    await setOTP(email, otp);

    // In a real application, you would send the OTP via email
    // For demo purposes, we'll just return it
    console.log(`OTP for ${email}: ${otp}`);

    return NextResponse.json({
      message: "OTP sent to email",
      // Remove this in production - only for demo
      otp,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
