# Tamatar GraphQL Backend - Development Instructions

> **📚 Comprehensive Documentation**: For detailed project information, see the [docs/](../docs/) directory:
> - [Project Overview](../docs/PROJECT_OVERVIEW.md) - Project vision, mission, and business context
> - [Technical Specifications](../docs/TECHNICAL_SPECS.md) - Complete architecture and technical details
> - [Development Roadmap](../docs/ROADMAP.md) - Feature development timeline and priorities
> - [Best Practices](../docs/BEST_PRACTICES.md) - Code quality standards and guidelines
> - [Development Rules](../docs/DEVELOPMENT_RULES.md) - Strict rules and conventions
> - [Error Codes Reference](../docs/ERROR_CODES.md) - Complete error handling guide for frontend developers
> - [Error System Summary](../docs/ERROR_SYSTEM_SUMMARY.md) - Overview of the error handling system
> - [Architecture](../ARCHITECTURE.md) - Backend architecture documentation

## Quick Start Context

**Tamatar** is a developer progress tracking platform where developers log daily progress, manage projects, track GitHub activity, and discover learning resources.

## Core Tech Stack
- **Runtime**: Bun with TypeScript (strict mode)
- **Framework**: Hono for public routes, GraphQL Yoga for protected operations
- **Database**: PostgreSQL with Prisma ORM
- **Schema**: Pothos for type-safe GraphQL schema building
- **Validation**: Zod for runtime validation
- **Authentication**: JWT with José library
- **Email**: React.Email + Pluck for templating

## Key Development Principles

### 1. Clear Separation of Concerns
- **Hono Routes**: Public operations (auth, uploads, webhooks)
- **GraphQL**: Protected/authenticated operations (user data, projects, logs)
- **Service Layer**: Business logic separated from transport layer
- **Database Layer**: Centralized data access functions

### 2. Type Safety Everywhere
- TypeScript strict mode for all files
- Zod schemas for runtime validation
- Pothos for type-safe GraphQL schema building
- Export types from Prisma models

### 3. Security First
- Validate all inputs with Zod schemas
- JWT authentication with short expiration
- Field-level authorization in GraphQL
- Proper error handling without exposing internals

### 4. Performance & Scalability
- DataLoader for N+1 query prevention
- Database indexes on frequently queried fields
- Pagination for large datasets
- Structured logging with Pino

## File Organization Pattern
```
src/
├── modules/              # Feature modules (users, projects, etc.)
│   └── [feature]/
│       ├── service.ts    # Business logic
│       ├── resolvers.ts  # GraphQL resolvers
│       ├── routes.ts     # Public HTTP routes (optional)
│       ├── types.ts      # TypeScript types
│       ├── schemas.ts    # Zod validation schemas
│       └── __tests__/    # Module tests
├── db/                   # Database layer (one file per table)
├── graphql/              # GraphQL configuration
├── schemas/              # Shared Zod schemas
├── utils/                # Shared utilities
└── config/               # Configuration files
```

## Authentication Flow
1. **Public Routes** (`/auth/*`): Registration, login, email verification
2. **GraphQL Operations**: All authenticated user operations
3. **Session Management**: JWT tokens with device tracking
4. **Username Generation**: Auto-generated from email during signup

## Database Design Principles
- Descriptive model names in PascalCase
- Proper relations with cascade deletes
- Indexes for frequently queried fields
- Timestamps (`createdAt`/`updatedAt`) on all models
- Enums for status fields and categories

## Error Handling Standards
- Consistent error types across application
- GraphQL errors with proper codes for GraphQL operations
- User-friendly error messages
- Comprehensive logging with context
- Use standardized error codes from `src/lib/errors.ts`
- Follow error handling patterns documented in `docs/ERROR_CODES.md`

## Code Quality Requirements
- All functions must have explicit TypeScript return types
- Business logic must be testable (dependency injection)
- No direct database calls in resolvers (use service layer)
- Comprehensive test coverage for each module

## Quick Reference Commands
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

## Getting Help
- Check the [docs/](../docs/) directory for comprehensive information
- Review [ARCHITECTURE.md](../ARCHITECTURE.md) for detailed backend architecture
- Follow patterns established in existing modules
- Refer to [Development Rules](../docs/DEVELOPMENT_RULES.md) for strict guidelines

When implementing features, always prioritize:
1. **Type Safety**: Use TypeScript and Zod validation
2. **Security**: Validate inputs and implement proper authorization  
3. **Performance**: Optimize database queries and use caching
4. **Maintainability**: Follow established patterns and write tests
5. **Documentation**: Update relevant docs when adding new features