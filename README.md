# Authentication - Connected to backend test

## Getting Started

First, run the development server:

```bash
npm install
```

```bash
npm run dev

# or

yarn dev

```

## Setup env and env.local
```bash
# .env

DATABASE_URL="postgresql://postgres:<password>@localhost:<port>/<db>?schema=public"
```

```bash
# .env.local

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Key
GOOGLE_CLIENT_ID=Key
GOOGLE_CLIENT_SECRET=Key
```

```bash
# NEXTAUTH_SECRET Key

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
## GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET your key
Open 
[console.cloud.google.com](https://console.cloud.google.com/)
```bash
# 1. Go to APIs & Services -> OAuth consent screen 

# 2. Setting External 

# 3. Go to Create Creadentials -> OAuth Client ID
- Application type: Web application
- Authorized JavaScript origins 
http://localhost:3000 
https://your-app.vercel.app เมื่อขึ้น Vercel

# Authorized redirect URIs
http://localhost:3000/api/auth/callback/google
https://your-app.vercel.app/api/auth/callback/google เมื่อขึ้น Vercel
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
