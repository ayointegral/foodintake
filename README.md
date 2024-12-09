# Health & Nutrition Planner

A comprehensive health and nutrition planner that helps users track their nutrition, plan meals, and achieve their health goals.

## Features

- 🔐 User Authentication with Email Verification
- 📊 Personalized Dashboard
- 🍽️ Smart Meal Planning
- 📈 Progress Tracking
- 📚 Educational Content
- 💪 Health Analytics
- 🎯 Goal Setting & Tracking

## Tech Stack

- **Frontend**: React + TypeScript with Vite
  - UI Components: Shadcn UI
  - State Management: TanStack Query
  - Routing: Wouter
  - Forms: React Hook Form + Zod
  - Styling: Tailwind CSS

- **Backend**: Node.js + Express
  - Database ORM: Drizzle with PostgreSQL
  - Authentication: JWT
  - API: RESTful endpoints

## Getting Started

### Prerequisites

- Node.js v18 or later
- PostgreSQL database
- npm package manager

### Environment Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-key
```

4. Push the database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Development Workflow

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility functions and configs
│   │   ├── pages/        # Application pages
│   │   └── types/        # TypeScript type definitions
├── db/                    # Database configuration and schema
├── server/                # Backend Express application
│   ├── routes.ts         # API route definitions
│   └── index.ts          # Server entry point
```

### Code Style Guide

- Use TypeScript for type safety
- Follow React functional component patterns
- Implement proper error handling
- Write descriptive commit messages

### Database Schema

The application uses the following main tables:

- `users`: User profiles and authentication
- `meals`: Meal tracking and planning
- `nutrition`: Daily nutrition logs

See `db/schema.ts` for complete schema definitions.

### API Routes

#### Authentication
- `POST /api/auth/signup`: Create new user account
- `POST /api/auth/signin`: User login
- `GET /api/auth/me`: Get current user

#### User Management
- `GET /api/users/:id`: Get user profile
- `POST /api/users`: Create user profile

#### Nutrition Tracking
- `GET /api/nutrition`: Get nutrition history
- `POST /api/nutrition`: Log nutrition data

#### Meal Planning
- `GET /api/meals/today`: Get today's meals
- `POST /api/meals`: Create new meal

## Building for Production

1. Build the frontend:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (when implemented)
5. Submit a pull request

### Commit Guidelines

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build process or auxiliary tool changes

## License

This project is licensed under the MIT License.
