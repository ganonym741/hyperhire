# Menu Management System

A full-stack hierarchical menu management system with a modern, responsive UI and robust backend architecture.

![Menu Management System](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### Frontend
- ✅ **Hierarchical Tree Menu** with unlimited depth
- ✅ **Expand/Collapse** functionality with Expand All/Collapse All
- ✅ **CRUD Operations** (Create, Read, Update, Delete)
- ✅ **Responsive Design** (Desktop, Tablet, Mobile)
- ✅ **Modern UI** with TailwindCSS
- ✅ **State Management** with Redux Toolkit
- ✅ **Atomic Design** architecture
- ✅ **TypeScript** for type safety

### Backend
- ✅ **RESTful API** with NestJS
- ✅ **Domain-Driven Design** (DDD) architecture
- ✅ **PostgreSQL** database with Prisma ORM
- ✅ **Comprehensive Testing** (Unit & Integration tests)
- ✅ **Input Validation** with class-validator
- ✅ **API Documentation** ready
- ✅ **CORS** enabled for frontend integration

## 📸 Screenshot Reference

The application is built to match the provided design with:
- Dark sidebar navigation
- Tree menu with expand/collapse icons
- Split-view layout (tree on left, details on right)
- Form for creating/editing menus
- Menu details display with ID, depth, parent, and name

## 🏗️ Architecture

### Frontend Architecture
```
Next.js 14 (App Router)
├── Atomic Design Components
│   ├── Atoms (Button, Input, Icon)
│   ├── Molecules (TreeMenuItem, MenuForm)
│   └── Organisms (TreeMenu, Sidebar)
├── Redux Toolkit (State Management)
├── TailwindCSS (Styling)
└── Axios (API Client)
```

### Backend Architecture
```
NestJS Framework
├── Domain Layer
│   ├── Entities (Business logic)
│   └── Repository Interfaces
├── Application Layer
│   ├── Services (Use cases)
│   └── DTOs (Data transfer)
├── Infrastructure Layer
│   ├── Prisma (Database)
│   └── Repository Implementations
└── Presentation Layer
    └── Controllers (API endpoints)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd hyperhire-test
```

2. **Setup Backend**
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start backend server
npm run start:dev
```

Backend will run on `http://localhost:3001`

3. **Setup Frontend**
```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local if needed

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
hyperhire-test/
├── backend/                    # NestJS Backend
│   ├── prisma/                # Database schema & migrations
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── application/       # Application layer (Services, DTOs)
│   │   ├── domain/           # Domain layer (Entities, Interfaces)
│   │   ├── infrastructure/   # Infrastructure (Database, Repositories)
│   │   ├── modules/          # NestJS modules
│   │   ├── presentation/     # Presentation layer (Controllers)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/                 # E2E tests
│   └── package.json
│
├── frontend/                  # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Next.js 14 App Router
│   │   ├── components/       # Atomic Design components
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   └── organisms/
│   │   ├── store/           # Redux store
│   │   ├── lib/             # Utilities & API client
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   └── package.json
│
└── README.md                 # This file
```

## 🔌 API Endpoints

### Menus
```
GET    /api/menus              # Get all menus
GET    /api/menus/tree         # Get menu tree structure
GET    /api/menus/roots        # Get root menus
GET    /api/menus/:id          # Get menu by ID
GET    /api/menus/:id/children # Get children of a menu
POST   /api/menus              # Create a new menu
PUT    /api/menus/:id          # Update a menu
DELETE /api/menus/:id          # Delete a menu
```

### Request/Response Examples

**Create Menu:**
```json
POST /api/menus
{
  "name": "System Management",
  "parentId": "uuid-of-parent" // optional
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "System Management",
  "depth": 0,
  "parentId": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Testing

### Backend Tests
```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests
```bash
cd frontend

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** class-validator
- **Testing:** Jest

## 📱 Responsive Design

The application is fully responsive across all devices:

- **Desktop (1024px+):** Full sidebar + split view
- **Tablet (768px-1023px):** Collapsible sidebar
- **Mobile (<768px):** Stack layout with drawer navigation

## 🎨 Design Patterns

### Frontend
- **Atomic Design:** Component organization
- **Redux Toolkit:** State management with slices
- **Custom Hooks:** Reusable logic
- **Composition:** Component composition over inheritance

### Backend
- **Domain-Driven Design (DDD):** Clear separation of concerns
- **Repository Pattern:** Data access abstraction
- **Dependency Injection:** Loose coupling
- **DTO Pattern:** Data transfer and validation

## 🔒 Security

- Input validation on all endpoints
- SQL injection prevention via Prisma
- CORS configuration
- Environment variable protection

## 📈 Performance

- Code splitting with Next.js
- Lazy loading components
- Optimized database queries
- Efficient state management
- Tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Kilo Code** - Full-stack development

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- Next.js team for the powerful React framework
- Prisma team for the excellent ORM
- TailwindCSS for the utility-first CSS framework

## 📞 Support

For support, please open an issue in the repository.

---

**Built with ❤️ using modern web technologies**