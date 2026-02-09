# Database Setup Guide

This project uses Prisma ORM with MySQL database.

## Prerequisites

1. **MySQL Server** installed and running
2. **Node.js** installed (v18 or higher recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Database

Create a new MySQL database:

```sql
CREATE DATABASE sandra_cleaning CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="mysql://username:password@localhost:3306/sandra_cleaning"
```

Replace:
- `username` with your MySQL username
- `password` with your MySQL password
- `localhost` with your MySQL host (if remote)
- `3306` with your MySQL port (if different)
- `sandra_cleaning` with your database name (if different)

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Push Schema to Database

```bash
npx prisma db push
```

This will create all the necessary tables in your MySQL database.

### 6. Start the Development Server

```bash
npm run dev
```

The application will automatically:
- Insert sample reviews (if the reviews table is empty)
- Create a default admin user (if none exists)

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default admin password immediately after first login!

## Common Issues

### Error: Can't reach database server

- Make sure MySQL is running
- Verify your DATABASE_URL is correct
- Check if your MySQL user has the necessary permissions

### Error: Authentication plugin

If you get an authentication error, try using `mysql_native_password`:

```sql
ALTER USER 'username'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### Error: Table doesn't exist

Run the Prisma push command again:
```bash
npx prisma db push
```

## Database Schema

The database includes the following tables:

- **reviews** - Customer reviews with approval workflow
- **admin_users** - Admin user accounts
- **admin_sessions** - Admin session management
- **faqs** - Frequently Asked Questions (with i18n support)

## Production Deployment

When deploying to production:

1. Set the `DATABASE_URL` environment variable to your production MySQL database
2. Run `npx prisma generate` as part of your build process
3. Run `npx prisma db push` on your production database (or use migrations)

For production, it's recommended to use Prisma migrations instead of `db push`:

```bash
npx prisma migrate dev --name init
npx prisma migrate deploy
```

## Useful Prisma Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Format Prisma schema
npx prisma format

# Validate Prisma schema
npx prisma validate
```
