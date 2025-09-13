import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl);

export async function setOTP(email: string, otp: string): Promise<void> {
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await redis.setex(`otp:${email}`, 600, JSON.stringify({ email, otp, expires }));
}

export async function getOTP(email: string): Promise<{ email: string; otp: string; expires: number } | null> {
  const data = await redis.get(`otp:${email}`);
  return data ? JSON.parse(data) : null;
}

export async function deleteOTP(email: string): Promise<void> {
  await redis.del(`otp:${email}`);
}

export async function generateOTP(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString();
}