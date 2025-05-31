# Tamatar GraphQL Backend - Architecture & Design Rules

## Core Design Principles

### 1. Clear Separation of Concerns
- **Hono Routes**: Handle all public operations (auth, file uploads, webhooks, etc.)
- **GraphQL**: Handle all protected/authenticated operations (user data, projects, logs)
- **Database Layer**: Centralized data access functions
- **Business Logic**: Separated from transport layer

### 2. Module-Based Organization
Each feature module should be self-contained with its own:
- Routes/resolvers
- Schemas/validation
- Database functions
- Types
- Tests
- Documentation

### 3. Maintainability First
- Single responsibility principle
- Clear naming conventions
- Comprehensive documentation
- Type safety everywhere
- Easy to test and debug

## Folder Structure

```
src/
├── index.ts                    # Main server entry point
├── app.ts                      # Hono app configuration
├── config/                     # Configuration files
│   ├── env.ts                  # Environment variables validation
│   ├── database.ts             # Database configuration
│   └── constants.ts            # Application constants
├── db/                         # Database layer (one file per table)
│   ├── users.ts                # User CRUD operations
│   ├── projects.ts             # Project CRUD operations
│   ├── daily-logs.ts           # Daily log CRUD operations
│   ├── resources.ts            # Resource CRUD operations
│   └── index.ts                # Export all database functions
├── schemas/                    # All validation schemas
│   ├── auth.ts                 # Authentication schemas
│   ├── user.ts                 # User-related schemas
│   ├── project.ts              # Project schemas
│   ├── daily-log.ts            # Daily log schemas
│   └── index.ts                # Export all schemas
├── types/                      # TypeScript type definitions
│   ├── auth.ts                 # Auth-related types
│   ├── api.ts                  # API response types
│   └── database.ts             # Database-related types
├── utils/                      # Shared utilities
│   ├── jwt.ts                  # JWT utilities
│   ├── password.ts             # Password hashing utilities
│   ├── validation.ts           # Validation helpers
│   ├── logger.ts               # Logging configuration
│   └── errors.ts               # Error handling utilities
├── middleware/                 # Shared middleware
│   ├── auth.ts                 # Authentication middleware
│   ├── validation.ts           # Request validation middleware
│   ├── cors.ts                 # CORS configuration
│   └── rate-limit.ts           # Rate limiting
├── modules/                    # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── routes.ts           # Auth routes (login, register, etc.)
│   │   ├── services.ts         # Auth business logic
│   │   ├── types.ts            # Auth-specific types
│   │   ├── schemas.ts          # Auth validation schemas
│   │   └── tests/              # Auth module tests
│   ├── users/                  # User management module (complex)
│   │   ├── service.ts          # Main orchestrator service
│   │   ├── resolvers.ts        # Main GraphQL resolvers
│   │   ├── types.ts            # Shared user types
│   │   ├── schemas.ts          # Shared validation schemas
│   │   ├── services/           # Sub-modules for user features
│   │   │   ├── profile/        # Profile management sub-module
│   │   │   │   ├── service.ts         # Profile business logic
│   │   │   │   ├── types.ts           # Profile-specific types
│   │   │   │   ├── schemas.ts         # Profile validation schemas
│   │   │   │   ├── resolvers.ts       # Profile GraphQL resolvers (optional)
│   │   │   │   └── tests/             # Profile tests
│   │   │   ├── social/         # Social features sub-module
│   │   │   │   ├── service.ts         # Social business logic
│   │   │   │   ├── types.ts           # Social-specific types
│   │   │   │   ├── schemas.ts         # Social validation schemas
│   │   │   │   ├── resolvers.ts       # Social GraphQL resolvers (optional)
│   │   │   │   └── tests/             # Social tests
│   │   │   ├── analytics/      # Analytics & insights sub-module
│   │   │   │   ├── service.ts         # Analytics business logic
│   │   │   │   ├── types.ts           # Analytics-specific types
│   │   │   │   ├── schemas.ts         # Analytics validation schemas
│   │   │   │   └── tests/             # Analytics tests
│   │   │   ├── preferences/    # User preferences sub-module
│   │   │   │   ├── service.ts         # Preferences business logic
│   │   │   │   ├── types.ts           # Preferences types
│   │   │   │   ├── schemas.ts         # Preferences validation
│   │   │   │   └── tests/             # Preferences tests
│   │   │   └── security/       # Account security sub-module
│   │   │       ├── service.ts         # Security business logic
│   │   │       ├── types.ts           # Security-specific types
│   │   │       ├── schemas.ts         # Security validation
│   │   │       └── tests/             # Security tests
│   │   └── tests/              # Main user module tests
│   ├── projects/               # Project management module (simple)
│   │   ├── service.ts          # Project business logic
│   │   ├── resolvers.ts        # GraphQL resolvers
│   │   ├── types.ts            # Project-specific types
│   │   ├── schemas.ts          # Project validation schemas
│   │   ├── routes.ts           # Public project routes (optional)
│   │   └── tests/              # Project module tests
│   ├── daily-logs/             # Daily logging module (simple)
│   │   ├── service.ts          # Daily log business logic
│   │   ├── resolvers.ts        # GraphQL resolvers
│   │   ├── types.ts            # Daily log-specific types
│   │   ├── schemas.ts          # Daily log validation schemas
│   │   └── tests/              # Daily log module tests
│   └── resources/              # Learning resources module (complex)
│       ├── service.ts          # Main orchestrator service
│       ├── resolvers.ts        # Main GraphQL resolvers
│       ├── types.ts            # Shared resource types
│       ├── schemas.ts          # Shared validation schemas
│       ├── services/           # Sub-modules for resource features
│       │   ├── management/     # Resource CRUD sub-module
│       │   │   ├── service.ts         # Management business logic
│       │   │   ├── types.ts           # Management-specific types
│       │   │   ├── schemas.ts         # Management validation
│       │   │   └── tests/             # Management tests
│       │   ├── validation/     # Resource validation sub-module
│       │   │   ├── service.ts         # Validation business logic
│       │   │   ├── types.ts           # Validation types
│       │   │   ├── schemas.ts         # Validation schemas
│       │   │   └── tests/             # Validation tests
│       │   ├── analytics/      # Resource analytics sub-module
│       │   │   ├── service.ts         # Analytics business logic
│       │   │   ├── types.ts           # Analytics types
│       │   │   ├── schemas.ts         # Analytics validation
│       │   │   └── tests/             # Analytics tests
│       │   └── recommendations/ # Recommendations sub-module
│       │       ├── service.ts         # Recommendations logic
│       │       ├── types.ts           # Recommendations types
│       │       ├── schemas.ts         # Recommendations validation
│       │       └── tests/             # Recommendations tests
│       └── tests/              # Main resource module tests
├── graphql/                    # GraphQL configuration
│   ├── schema.ts               # Combined GraphQL schema
│   ├── context.ts              # GraphQL context creation
│   ├── yoga.ts                 # Yoga server configuration
│   └── pothos.ts               # Pothos schema builder
├── emails/                     # Email templates and utilities
│   ├── templates/              # Email templates
│   ├── sender.ts               # Email sending logic
│   └── types.ts                # Email-related types
└── lib/                        # External library configurations
    ├── prisma.ts               # Prisma client configuration
    └── redis.ts                # Redis client (if needed)
```

## Design Rules

### Rule 1: Modular Architecture
Each feature module in `src/modules/` follows a hierarchical structure with two organization patterns:

#### Module Organization Patterns

**Simple Modules** (projects, daily-logs, auth):
- All functionality contained in root module files
- Used when the feature domain has limited complexity
- Typically under 500 lines of business logic

**Complex Modules** (users, resources):
- Functionality split into focused sub-modules
- Each sub-module can contain its own types, schemas, resolvers, and tests
- Used when the feature domain has multiple distinct areas of responsibility
- Main service acts as orchestrator

#### Core Module Structure (Simple Modules)
- `service.ts`: Business logic for the entire module
- `resolvers.ts`: GraphQL resolvers (for protected operations)
- `routes.ts`: Public HTTP routes (optional)
- `types.ts`: Module-specific TypeScript types
- `schemas.ts`: Zod validation schemas for the module
- `tests/`: Comprehensive test coverage

#### Sub-Module Structure (Complex Modules)
- `services/[feature]/`: Sub-module directory for specific feature area
- `services/[feature]/service.ts`: Focused business logic for the feature
- `services/[feature]/types.ts`: Feature-specific TypeScript types (optional)
- `services/[feature]/schemas.ts`: Feature-specific validation schemas (optional)
- `services/[feature]/resolvers.ts`: Feature-specific GraphQL resolvers (optional)
- `services/[feature]/tests/`: Feature-specific test coverage
- Main module files coordinate and delegate to sub-modules

**Sub-Module File Guidelines:**
- **service.ts**: Always required - contains the core business logic for the feature
- **types.ts**: Optional - only create when the sub-module needs feature-specific types
- **schemas.ts**: Optional - only create when the sub-module needs its own validation schemas
- **resolvers.ts**: Optional - only create when the sub-module needs dedicated GraphQL resolvers
- **tests/**: Recommended - comprehensive test coverage for the sub-module functionality

#### Module Structure Examples

**Simple Module (projects, daily-logs):**
```text
modules/projects/
├── service.ts          # All business logic
├── resolvers.ts        # GraphQL resolvers
├── types.ts            # TypeScript definitions
├── schemas.ts          # Zod validation schemas
└── tests/              # Test files
```

**Complex Module (users, resources):**
```text
modules/users/
├── service.ts          # Main orchestrator service
├── resolvers.ts        # Main GraphQL resolvers
├── types.ts            # Shared TypeScript definitions
├── schemas.ts          # Shared validation schemas
├── services/           # Sub-modules for user features
│   ├── profile/        # Profile management sub-module
│   │   ├── service.ts         # Profile business logic
│   │   ├── types.ts           # Profile-specific types
│   │   ├── schemas.ts         # Profile validation schemas
│   │   └── tests/             # Profile tests
│   ├── social/         # Social features sub-module
│   │   ├── service.ts         # Social business logic
│   │   ├── types.ts           # Social-specific types
│   │   ├── schemas.ts         # Social validation schemas
│   │   └── tests/             # Social tests
│   ├── analytics/      # Analytics & insights sub-module
│   │   ├── service.ts         # Analytics business logic
│   │   ├── types.ts           # Analytics-specific types
│   │   └── tests/             # Analytics tests
│   ├── preferences/    # User preferences sub-module
│   │   ├── service.ts         # Preferences business logic
│   │   ├── schemas.ts         # Preferences validation
│   │   └── tests/             # Preferences tests
│   └── security/       # Account security sub-module
│       ├── service.ts         # Security business logic
│       ├── types.ts           # Security-specific types
│       └── tests/             # Security tests
└── tests/              # Main user module tests
```

#### When to Create Sub-Modules
- **Service file exceeds 500 lines**: Split into logical sub-modules
- **Distinct feature areas**: Different domains within a module (profile vs social vs analytics)
- **Different schemas/types**: When sub-features need their own validation or type definitions
- **Independent testing**: When sub-features need isolated test suites
- **Team collaboration**: When different developers work on different sub-features

#### Sub-Module Organization Best Practices
- **Keep sub-modules focused**: Each sub-module should have a single responsibility
- **Use descriptive names**: Sub-module names should clearly indicate their purpose
- **Minimize cross-dependencies**: Sub-modules should be as independent as possible
- **Share common types**: Use main module types.ts for shared interfaces across sub-modules
- **Coordinate through main service**: Main module service should orchestrate sub-module operations
- **Consistent patterns**: Follow the same patterns across all sub-modules in a complex module

#### Sub-Module File Organization Guidelines
- **Always include service.ts**: Every sub-module must have a service file with business logic
- **Optional specialized files**: Only create additional files when the sub-module specifically needs them
- **Avoid over-fragmentation**: Don't create separate files for very small amounts of code
- **Import from main module**: Sub-modules can import shared types/schemas from main module files
- **Export for main module**: Main module service should import and use sub-module services
- **Test coverage**: Each sub-module with significant logic should have its own test suite

### Rule 2: Database Layer
- All database operations must go through `src/db/` functions
- One file per database table/model
- Functions should be pure and focused (getById, create, update, delete, etc.)
- Use transactions for multi-table operations
- Always use TypeScript for type safety

### Rule 3: Schema Management
- All Zod validation schemas in `src/schemas/`
- Group by feature area (auth, user, project, etc.)
- Export schemas and inferred types
- Reuse schemas between modules when possible

### Rule 4: Route vs GraphQL Decision
**Use Hono Routes for:**
- Authentication (login, register, password reset)
- File uploads
- Webhooks
- Public APIs
- Health checks
- Any operation that doesn't require user authentication

**Use GraphQL for:**
- All authenticated user operations
- CRUD operations on user data
- Complex queries with relationships
- Real-time subscriptions (future)

### Rule 5: Error Handling
- Use consistent error types across the application
- Log all errors with context
- Return user-friendly error messages
- Use GraphQL errors for GraphQL operations
- Use HTTP status codes for REST routes

### Rule 6: Type Safety
- Everything must be typed with TypeScript
- Use Zod schemas for runtime validation
- Export types from database models
- Use Pothos for type-safe GraphQL schema building

### Rule 7: Testing
- Each module must have comprehensive tests
- Use dependency injection for testability
- Mock external dependencies
- Test both success and error cases

### Rule 8: Documentation
- Update this file when adding new rules
- Document complex business logic
- Use JSDoc for function documentation
- Keep README.md updated with setup instructions
- Create comprehensive README.md files for all modules and sub-modules
- Follow standardized documentation structure for all modules

## Authentication Flow

1. **Token-Based Authentication**:
   - **Access Token**: Short-lived (15 minutes), contains user info
   - **Refresh Token**: JWT containing session ID, used to validate against Session table
   - **Session Management**: Each login creates a session record, session ID acts as refresh token identifier
   - **Multi-Device Support**: Users can have multiple active sessions across devices
   - **Auto-logout**: When session expires or is revoked

2. **Username Generation**:
   - Username auto-generated from email part before '@' during signup
   - Example: `john.doe@example.com` → username: `john.doe`
   - Users can update username later via GraphQL mutation
   - Username must be unique across platform

3. **Public Routes** (`/auth/*`):
   - `POST /auth/signup` - User registration (email + password only)
   - `POST /auth/login` - User authentication
   - `POST /auth/refresh` - Generate new access token using refresh token
   - `POST /auth/logout` - Revoke refresh token
   - `POST /auth/logout-all` - Revoke all user's refresh tokens
   - `POST /auth/forgot-password` - Password reset request
   - `POST /auth/reset-password` - Password reset confirmation
   - `POST /auth/verify-email` - Email verification

4. **Protected GraphQL Operations**:
   - All GraphQL mutations and queries require valid access token
   - User context automatically injected from JWT payload
   - Username updates handled via GraphQL mutation

5. **Session Management**:
   - Track user sessions across devices with device fingerprinting
   - Session expiration and cleanup
   - Ability to view and revoke sessions from other devices
   - Device type detection (mobile, desktop, tablet)
   - IP address and user agent tracking for security

## Naming Conventions

### Files and Folders
- Use kebab-case for files and folders: `daily-logs.ts`, `user-profile.ts`
- Use descriptive names: `auth-middleware.ts` not `middleware.ts`
- Group related files in folders with index.ts exports

### Functions and Variables
- Use camelCase: `getUserById`, `createProject`
- Use descriptive names: `validateUserInput` not `validate`
- Prefix async functions with action verbs: `fetchUser`, `createLog`

### Types and Interfaces
- Use PascalCase: `UserProfile`, `ProjectData`
- Suffix with descriptive terms: `CreateUserInput`, `LoginResponse`
- Use unions for status types: `type Status = 'active' | 'inactive'`

### Database Functions
- Follow CRUD patterns: `getUserById`, `createUser`, `updateUser`, `deleteUser`
- Use plural for collections: `getAllUsers`, `getUserProjects`
- Be specific: `getUserByEmail`, `getProjectsByUserId`

## Code Quality Rules

### Rule 9: Dependency Management
- Keep dependencies minimal and well-justified
- Use Bun-native features when possible (Bun.password, etc.)
- Prefer lightweight libraries over heavy frameworks
- Document why each dependency is needed

**Key Dependencies:**
- `ua-parser-js`: Reliable User-Agent parsing for device detection
- `jose`: JWT token handling (industry standard)
- `zod`: Runtime type validation and schema definition
- `prisma`: Type-safe database ORM
- `hono`: Lightweight web framework for Bun

### Rule 10: Performance
- Use database indexes for frequent queries
- Implement pagination for list operations
- Cache frequently accessed data
- Use DataLoader for GraphQL N+1 prevention

### Rule 11: Security
- Validate all inputs with Zod schemas
- Use parameterized queries (Prisma handles this)
- Implement rate limiting on public endpoints
- Log security events
- Use HTTPS in production

### Rule 12: Environment Configuration
- All environment variables in `src/config/env.ts`
- Use Zod to validate environment variables
- Provide sensible defaults for development
- Document all required environment variables

### Rule 13: Module Documentation Standards
- Every module must have a comprehensive `README.md` file
- Every sub-module must have its own `README.md` file
- Follow standardized documentation structure for consistency
- Keep documentation updated with implementation progress
- Include usage examples and API references
- Document integration points and dependencies

#### Module README Structure
Each module README must include:
- **Purpose**: Clear description of the module's responsibility
- **Progress**: Current implementation status with checkboxes
- **Architecture**: Module structure and sub-module organization
- **API Reference**: Key functions, types, and GraphQL operations
- **Usage Examples**: Code examples showing how to use the module
- **Testing**: How to run tests and coverage information
- **Dependencies**: Internal and external dependencies
- **Future Plans**: Planned features and improvements

#### Sub-Module README Structure
Each sub-module README must include:
- **Purpose**: Specific functionality provided by the sub-module
- **Progress**: Implementation status of features
- **API**: Functions, types, and schemas provided
- **Usage**: Examples of how the sub-module is used
- **Testing**: Sub-module specific tests
- **Integration**: How it integrates with the main module

#### Documentation Maintenance
- Update README files when adding new features
- Mark completed features in progress checklists
- Add new sections as modules evolve
- Keep examples current with API changes
- Review and update documentation during code reviews

## Future Considerations

### Scalability
- Design for horizontal scaling
- Keep services stateless
- Use message queues for async operations
- Consider microservices for large features

### Monitoring
- Implement health checks
- Add performance monitoring
- Log all important operations
- Set up alerts for critical failures

---

## How to Update This Document

When adding new rules or changing the architecture:

1. **First Rule**: Always update this `ARCHITECTURE.md` file
2. Update the relevant section (Design Rules, Folder Structure, etc.)
3. Add new rules with incremental numbers
4. Document the reasoning behind the change
5. Update any affected modules to follow new rules
6. Create migration tasks if existing code needs updates

---

*Last Updated: [Current Date]*
*Version: 1.0*
