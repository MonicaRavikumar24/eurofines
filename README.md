# Eurofines - Authentication System

A modern authentication system with separate login for users and admins built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 User and Admin authentication
- 📝 Sign Up and Sign In pages
- 🏢 Entity selection (Adgyl, Agro, Biopharma)
- 📦 Inventory selection (Test Item, Study, Facility Doc)
- 🔒 Protected routes
- 👤 Separate dashboards for users and admins
- 🎨 Beautiful, modern UI with Tailwind CSS
- 💾 Local storage for data persistence
- 🛡️ Type-safe with TypeScript

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating Accounts

1. Click "Sign Up" to create a new account
2. Choose either "User" or "Admin" account type
3. Fill in your email and password
4. You'll be redirected to the entity selection page

### Signing In

1. Click "Sign In"
2. Enter your email and password
3. You'll be redirected to the entity selection page

### Selecting an Entity

After logging in, you'll see the Eurofines entity selection page with three options:
- **Adgyl** 🏭 - Manufacturing entity
- **Agro** 🌾 - Agriculture entity
- **Biopharma** 💊 - Pharmaceutical entity

Select your preferred entity to continue.

### Selecting Inventory

After selecting an entity, you'll see the inventory selection page with three options:
- **Test Item** 🧪 - Test items management
- **Study** 📊 - Study management
- **Facility Doc** 📁 - Facility documentation

Select your inventory type to access your dashboard.

### Testing

To test the system:
- Create a regular user account
- Create an admin account
- Try accessing protected routes when logged out (you'll be redirected to login)
- Try accessing admin dashboard with a regular user account (you'll be redirected to user dashboard)

## Project Structure

```
src/
├── components/       # Reusable components (ProtectedRoute)
├── context/         # React Context (AuthContext)
├── pages/           # Page components (SignIn, SignUp, EntitySelection, InventorySelection, Dashboards)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── App.css          # Global styles
```

## Built With

- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS
- React Hook Form (available for future form validation)
