# Tamatar GraphQL Backend

A developer progress tracking platform backend built with Bun, TypeScript, GraphQL Yoga, and Prisma.

## 📚 Documentation

For comprehensive project information, see the documentation in the `docs/` directory:

- **[Project Overview](docs/PROJECT_OVERVIEW.md)** - Project vision, mission, and business context
- **[Technical Specifications](docs/TECHNICAL_SPECS.md)** - Complete architecture and technical details  
- **[Development Roadmap](docs/ROADMAP.md)** - Feature development timeline and priorities
- **[Best Practices](docs/BEST_PRACTICES.md)** - Code quality standards and guidelines
- **[Development Rules](docs/DEVELOPMENT_RULES.md)** - Strict rules and conventions
- **[Architecture](ARCHITECTURE.md)** - Backend architecture documentation

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) v1.2.12+
- PostgreSQL database
- Node.js 18+ (for compatibility)

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
bun db:migrate
bun db:seed
```

### Development

```bash
# Start development server
bun dev

# Run tests
bun test

# Open Prisma Studio
bun db:studio
```

## 🛠 Tech Stack

- **Runtime**: Bun
- **Framework**: Hono (public routes) + GraphQL Yoga (protected operations)  
- **Database**: PostgreSQL with Prisma ORM
- **Schema**: Pothos for type-safe GraphQL schema building
- **Validation**: Zod for runtime validation
- **Authentication**: JWT with José library
- **Email**: React.Email + Pluck
- **Logging**: Pino

## 📁 Project Structure

```
src/
├── modules/              # Feature modules (users, projects, etc.)
├── db/                   # Database layer (one file per table)
├── graphql/              # GraphQL configuration
├── schemas/              # Shared Zod schemas
├── utils/                # Shared utilities
└── config/               # Configuration files
```

## 🔧 Available Scripts

```bash
# Development
bun dev                 # Start development server
bun db:migrate         # Run database migrations
bun db:seed           # Seed database with test data

# Testing
bun test              # Run test suite
bun test:watch        # Run tests in watch mode

# Database
bun db:studio         # Open Prisma Studio
bun db:reset          # Reset database (development only)
```

## 🌟 Key Features

- **Daily Progress Logging**: Track learning and development progress
- **Project Management**: Manage development projects with GitHub integration
- **Resource Discovery**: Curated learning resources with community curation
- **Social Features**: Follow developers, share progress, and build community
- **Analytics**: Track progress patterns and learning insights

## 📖 Getting Help

- Check the [documentation](docs/) for detailed information
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Follow patterns in existing modules
- Refer to [Development Rules](docs/DEVELOPMENT_RULES.md) for guidelines

## 🤝 Contributing

1. Read the [Development Rules](docs/DEVELOPMENT_RULES.md)
2. Follow the [Best Practices](docs/BEST_PRACTICES.md)
3. Update documentation when adding features
4. Ensure tests pass before submitting PRs

## 📄 License

This project is licensed under the MIT License.
