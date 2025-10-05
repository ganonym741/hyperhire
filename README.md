# Hyperhire Test Project

A full-stack web application for menu management, featuring a modern frontend built with Next.js and a robust backend powered by NestJS with Prisma ORM.

## Project Overview

This project consists of two main components:

- **Frontend (fe)**: A Next.js application providing an intuitive user interface for menu management
- **Backend (be)**: A NestJS API server handling business logic and database operations

## Architecture

### Frontend Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Framework**: React 19.1.0
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Component Structure**:
  - `atoms/`: Basic UI components (Button, Input, etc.)
  - `molecules/`: Composite components (Breadcrumb, Select, etc.)
  - `organisms/`: Complex components (MenuForm, Sidebar, TreeView)
  - `templates/`: Layout components (MainLayout)
- **Key Features**:
  - Responsive menu tree view
  - CRUD operations for menu items
  - Toast notifications
  - Mobile-responsive design

### Backend Architecture

- **Framework**: NestJS 10.0.0
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator and class-transformer
- **Project Structure**:
  - `@core/`: Core modules (config, services, utils)
  - `@entities/`: Database entities
  - `menu/`: Menu management module
- **Key Features**:
  - RESTful API for menu operations
  - Database seeding and migrations
  - Standardized response middleware
  - Exception handling

### Database Schema

- **Menu Entity**: Hierarchical menu structure with parent-child relationships
- **Fields**: id, name, depth, parentId, createdAt, updatedAt

## Tech Stack

### Frontend

- Next.js 15.5.4
- React 19.1.0
- TypeScript 5.9.3
- Tailwind CSS 3.4.1
- Redux Toolkit 2.9.0
- Axios 1.12.2
- Lucide React (icons)
- ESLint 9.0.0
- Prettier 3.6.2

### Backend

- NestJS 10.0.0
- TypeScript 5.1.3
- Prisma 6.16.3
- PostgreSQL 8.16.3
- Swagger 11.2.0
- class-validator 0.14.2
- class-transformer 0.5.1
- Jest 29.5.0
- ESLint 9.0.0
- Prettier 3.0.0

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Docker (optional, for containerized setup)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd be
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Configure your PostgreSQL connection string

4. Set up the database:

   ```bash
   # Pull database schema (if using existing DB)
   npm run prisma:pull

   # Generate Prisma client
   npm run prisma:gen

   # Run migrations
   npm run prisma:migration

   # Seed the database
   npm run prisma:seeding
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3001` (or configured port).
Swagger documentation at `http://localhost:3001/api`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd fe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure API endpoint:

   - Update the API base URL in `src/service/api.ts` to point to your backend

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Available Scripts

### Backend Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run prisma:studio` - Open Prisma Studio for database management
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

The backend provides the following main endpoints:

- `GET /menus` - Get all menus with pagination and filtering
- `POST /menus` - Create a new menu item
- `PUT /menus/:id` - Update a menu item
- `DELETE /menus/:id` - Delete a menu item

For detailed API documentation, visit the Swagger UI at `/api` when the backend is running.

## Development Guidelines

### Code Quality

- ESLint and Prettier are configured for consistent code formatting
- Husky pre-commit hooks ensure code quality
- Commit messages follow conventional commits format

### Database

- Use Prisma migrations for schema changes
- Run seeders for initial data setup
- Use Prisma Studio for database inspection

### Testing

- Unit tests with Jest
- E2E tests for API endpoints
- Frontend testing can be added with React Testing Library

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. In Vercel dashboard, configure the project settings:
   - **Root Directory**: `fe/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (automatic for Next.js)
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` - Your Railway backend URL (e.g., `https://your-app.up.railway.app`)

The `vercel.json` file in the root configures the build settings for the monorepo.

### Railway (Backend)

1. Connect your GitHub repository to Railway
2. In Railway dashboard, set the **Root Directory** to `be/`
3. Railway will automatically detect the Dockerfile in the `be/` directory
4. Add a PostgreSQL database service in Railway
5. Set environment variables:
   - `DATABASE_URL` - Railway's PostgreSQL connection string (auto-generated)
   - `PORT` - `8080` (matches Dockerfile EXPOSE)

Alternatively, you can use the `railway.json` configuration file, but setting the root directory in the dashboard is more reliable for monorepos.

### Docker

Dockerfiles are provided for containerized deployment:

- `be/Dockerfile` - Production backend image
- `be/Dockerfile.dev` - Development backend image

### Environment Variables

**Backend:**

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3001, Railway: 8080)

**Frontend:**

- `NEXT_PUBLIC_API_URL` - Backend API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the UNLICENSED license.
