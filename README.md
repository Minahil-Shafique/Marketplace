## Marketplace App with OTP Authentication
A Next.js marketplace application with email OTP authentication, built with TypeScript, Supabase, and Redis.

## Features
🔐 Email OTP authentication (Login/Signup)

🛍️ Marketplace dashboard with product listings

🗄️ Supabase for user data storage

📦 Redis for OTP storage and verification

🐳 Docker compatible

📱 Responsive design

🎨 Clean, modern UI

## Tech Stack
Frontend: Next.js 13+ with TypeScript

Backend: Next.js API Routes

Database: Supabase (PostgreSQL)

Cache: Redis

Styling: CSS3

Deployment: Docker compatible

## Prerequisites
Before running this application, make sure you have:

Node.js 18+ installed

Redis installed and running

A Supabase account and project

## Installation
1. Clone the repository
bash
```
git clone <your-repo-url>
cd marketplace-app
```
3. Install dependencies
bash
```
npm install
```
5. Environment Variables
Create a .env.local file in the root directory:

env
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
REDIS_URL=redis://localhost:6379
```
# 4. Set up Supabase
Create a Supabase account at supabase.com

Create a new project

Get your URL and API keys from Settings → API

Create a users table with the following schema:

sql
```
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
# 5. Set up Redis
Option A: Install Redis directly on Windows
Download Redis for Windows from https://github.com/microsoftarchive/redis/releases

## Run the MSI installer

Redis will start automatically as a Windows service

Option B: Use Docker (if preferred)
bash
docker run -d --name redis -p 6379:6379 redis:7-alpine
## 6. Run the application

 Development mode
```
npm run dev
```
 Production build
```
npm run build
npm start
```
Docker Deployment
Using Docker Compose
Make sure Docker Desktop is running

Build and start the containers:

bash
```
docker compose up --build
```
Access the application at http://localhost:3000

Docker Compose File
The docker-compose.yml file includes:

Next.js application container

Redis container

Proper networking and volume configuration

## Project Structure
```
marketplace-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
├── docker-compose.yml       # Docker compose configuration
├── Dockerfile               # Docker configuration
└── package.json             # Dependencies and scripts
```

API Endpoints
POST /api/auth/signup - User registration with OTP

POST /api/auth/login - User login with OTP

POST /api/auth/verify - OTP verification

## Authentication Flow
User enters email (and name for signup)

System generates OTP and stores it in Redis with 10-minute expiration

OTP is sent to user's email (console log in development)

User enters OTP for verification

System verifies OTP and creates/authenticates user in Supabase

User is redirected to dashboard

## Development
Running in Development Mode
bash
```
npm run dev
```
Building for Production
bash
```
npm run build
npm start
```
Linting
bash
```
npm run lint
```
Environment Variables
Variable	Description	Required
NEXT_PUBLIC_SUPABASE_URL	Your Supabase project URL	Yes
NEXT_PUBLIC_SUPABASE_ANON_KEY	Your Supabase anonymous key	Yes
SUPABASE_SERVICE_ROLE_KEY	Your Supabase service role key	Yes
REDIS_URL	Redis connection URL	Yes
Troubleshooting
Common Issues
Redis connection errors: Make sure Redis is installed and running

Supabase connection errors: Verify your Supabase credentials

Docker issues: Ensure Docker Desktop is running

Redis Troubleshooting
bash
# Check if Redis is running
```
redis-cli ping
```
# Start Redis service (Windows)
```
net start redis
```
# Monitor Redis logs
docker logs redis
Supabase Troubleshooting
Verify your Supabase project is active

Check your API keys in Settings → API

Ensure the users table exists with correct schema

Contributing
Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -am 'Add feature'

Push to the branch: git push origin feature-name

Submit a pull request

License
This project is licensed under the MIT License.

Support
If you encounter any issues or have questions:

Check the troubleshooting section above

Search existing GitHub issues

Create a new issue with detailed information

Acknowledgments
Next.js for the React framework

Supabase for the backend services

Redis for caching and OTP storage
