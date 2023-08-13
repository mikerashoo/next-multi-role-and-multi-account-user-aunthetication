# Multi Role and Multi Account Authentication in Next.js 13

This project demonstrates how to implement multi role and multi account authentication in a Next.js 13 application using tRPC, NextAuth.js and Prisma.

## Features 

- User registration and login
- Two roles: User and Admin 
- Users can have multiple accounts associated to their user
- Two account types: Seller and Buyer
- Users with the "User" role can have Seller and/or Buyer accounts
- Admins cannot have accounts
- Protected routes based on user role and account type

## Technologies

- Next.js 13
- tRPC for API routes
- NextAuth.js for authentication
- Prisma for database models and migrations
- MySQL database

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/<your-username>/nextjs-multi-role-auth.git
cd nextjs-multi-role-auth
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables 

Rename `.env.example` to `.env` and update the environment variables
Replace `POSTGRES_PRISMA_URL` with your postgress database url.

### 4. Generate a secure secret key

```
openssl rand -base64 32
```

Replace `NEXTAUTH_SECRET` with the generated key.

### 5. Migrate the database

```
npx prisma migrate dev
``` 

### 6. Run the development server

```
npm run dev
```

Open `http://localhost:3000` to view the app.

## App Structure

- `pages/api/auth` - Auth routes for registering and logging in users
- `pages/api/trpc` - tRPC API routes for accessing app data
- `prisma` - Database models and migrations  
- `src/server` - tRPC server and context
- `src/pages` - Next.js page components
- `src/middlewares` - Route protection middlewares

## To Do

- Email verification during registration 
- Social login using NextAuth.js
- Forgot password workflow
- Two-factor authentication 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more info.