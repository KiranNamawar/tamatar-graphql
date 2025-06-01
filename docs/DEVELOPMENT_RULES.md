# Tamatar Development Rules

## Architecture Rules

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
- **types.ts**: Optional - create when the sub-module needs feature-specific TypeScript types
- **schemas.ts**: Optional - create when the sub-module needs its own Zod validation schemas
- **resolvers.ts**: Optional - create when the sub-module needs dedicated GraphQL resolvers separate from main module
- **tests/**: Recommended - comprehensive test coverage for the sub-module functionality

**When to Add Sub-Module Resolvers:**
- Sub-module has complex GraphQL operations that are logically separate from main module
- Sub-module needs specialized field resolvers or custom logic
- Sub-module resolvers would make the main resolvers file cleaner and more focused
- Different developers are working on different sub-module GraphQL operations

#### Module Structure Examples

**Simple Module (projects, daily-logs):**
```
modules/projects/
├── service.ts          # All business logic
├── resolvers.ts        # GraphQL resolvers
├── types.ts            # TypeScript definitions
├── schemas.ts          # Zod validation schemas
└── tests/              # Test files
```

**Complex Module (users, resources):**
```
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

### Rule 9: Dependency Management
- No direct database calls in resolvers
- Service layer must be database-agnostic
- Use dependency injection for external services
- Mock all external dependencies in tests

### Rule 10: Security First
- Validate all inputs with Zod schemas
- Hash passwords with bcrypt (12+ rounds)
- Use JWT tokens with short expiration
- Implement proper authorization checks
- Log all security events

### Rule 11: Iterative Development & Continuous Improvement
**Development Philosophy**: Focus on one component at a time, implement fully, test thoroughly, then refactor and improve before moving to the next component.

#### Development Cycle (ITTIR - Implement, Test, Think, Improve, Refactor)
1. **Implement**: Focus on ONE thing at a time
   - One module (e.g., `users` module)
   - One service function (e.g., `createUser`)
   - One resolver (e.g., `createUser` mutation)
   - One route (e.g., `POST /auth/login`)
   - One database function (e.g., `getUserById`)

2. **Test**: Verify the implementation works correctly
   - Write and run unit tests for the component
   - Test the API endpoint manually (Postman, curl, or GraphQL playground)
   - Verify database operations work as expected
   - Test error scenarios and edge cases
   - Ensure TypeScript compilation passes without errors

3. **Think**: Analyze the implementation critically
   - Does this follow established patterns?
   - Are there any security vulnerabilities?
   - Is the code readable and maintainable?
   - Are there performance implications?
   - Does it handle errors appropriately?

4. **Improve**: Look for enhancements and optimizations
   - **Code Duplication**: Identify repetitive code across modules
   - **Performance**: Optimize database queries, add indexes if needed
   - **Error Handling**: Ensure consistent error responses
   - **Type Safety**: Improve TypeScript types and validation
   - **Documentation**: Add JSDoc comments for complex logic

5. **Refactor**: Clean up and standardize
   - Extract common patterns into utility functions
   - Update shared schemas and types
   - Consolidate similar validation logic
   - Improve naming conventions if needed
   - Update documentation and README files

#### Implementation Order Priority
**Phase 1: Core Infrastructure**
- Database functions (one table at a time)
- Authentication routes
- Basic GraphQL schema setup

**Phase 2: Feature Implementation**
- User management (one operation at a time)
- Project management
- Daily logs
- Resource management

**Phase 3: Advanced Features**
- Social features
- Analytics
- GitHub integration

#### Quality Gates (Must Pass Before Moving On)
1. **All tests pass**: Unit tests, integration tests
2. **TypeScript compiles**: No type errors or `any` types
3. **Manual testing works**: API endpoints respond correctly
4. **Code review ready**: Follows established patterns and conventions
5. **Documentation updated**: README files, JSDoc comments, type definitions

#### Refactoring Checkpoints
After implementing **every 3-5 components**, conduct a refactoring session:

1. **Pattern Recognition**: Look for repeated code patterns
2. **Utility Extraction**: Create shared utility functions
3. **Schema Consolidation**: Merge similar Zod schemas
4. **Type Improvements**: Enhance TypeScript definitions
5. **Performance Review**: Identify optimization opportunities
6. **Documentation Sync**: Update all relevant documentation

#### Example Development Flow
```bash
# 1. IMPLEMENT: Create a new user service function
# Focus only on createUser function
src/modules/users/service.ts - implement createUser()

# 2. TEST: Verify it works
bun test users.service.test.ts
# Manual test via GraphQL playground

# 3. THINK: Review the implementation
# - Does it follow our error handling patterns?
# - Is input validation consistent with other modules?
# - Are types properly defined?

# 4. IMPROVE: Enhance based on analysis
# - Add better error messages
# - Improve TypeScript types
# - Add JSDoc documentation

# 5. REFACTOR: Clean up and standardize
# - Extract common validation logic
# - Update shared schemas if needed
# - Update module README

# THEN move to next component (e.g., updateUser function)
```

#### Anti-Patterns to Avoid
- **Don't work on multiple modules simultaneously**
- **Don't skip testing before moving to next component**
- **Don't implement large features without breaking them down**
- **Don't ignore refactoring opportunities**
- **Don't forget to update documentation**

#### Benefits of This Approach
- **Higher Quality**: Each component is thoroughly tested and refined
- **Consistency**: Patterns emerge and get standardized across the codebase
- **Maintainability**: Regular refactoring prevents technical debt accumulation
- **Knowledge Transfer**: Documentation stays current with implementation
- **Debugging**: Issues are isolated to small, well-tested components

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

### GraphQL Types
- Use PascalCase for object types: `User`, `Project`, `DailyLog`
- Use descriptive names for inputs: `CreateProjectInput`, `UpdateUserInput`
- Use enums for status fields: `ProjectStatus`, `UserRole`

## Code Quality Rules

### TypeScript Rules
- Always use strict mode
- No `any` types allowed
- Explicit return types for all functions
- Use type guards instead of type assertions
- Export types from modules

### Database Rules
- Use Prisma for all database operations
- Include proper error handling
- Use transactions for related operations
- Add indexes for frequently queried fields
- Include timestamps on all models

### GraphQL Rules
- Use Pothos for type-safe schema building
- Implement field-level authorization
- Use DataLoader for N+1 prevention
- Validate all inputs with Zod
- Provide helpful error messages

### Validation Rules
- Use Zod for runtime validation
- Validate at API boundaries
- Transform data during validation
- Provide clear error messages
- Export types from schemas

### Authentication Rules
- JWT tokens for authentication
- Short token expiration (24 hours max)
- Hash passwords with bcrypt
- Validate tokens on every request
- Implement proper session management

### Authorization Rules
- Check permissions at GraphQL field level
- Use role-based access control
- Implement resource-level permissions
- Log authorization failures
- Fail securely (deny by default)

## Performance Rules

### Database Performance
- Use indexes on frequently queried fields
- Implement pagination for large datasets
- Use `select` to limit returned fields
- Monitor and log slow queries
- Use database connection pooling

### GraphQL Performance
- Implement DataLoader for batching
- Use query complexity analysis
- Cache expensive operations
- Optimize field resolvers
- Implement proper pagination

### Caching Rules
- Cache expensive database queries
- Use Redis for session storage
- Implement proper cache invalidation
- Set appropriate TTL values
- Monitor cache hit rates

## Security Rules

### Input Validation
- Validate all user inputs
- Sanitize user-generated content
- Use parameterized queries
- Implement rate limiting
- Log suspicious activities

### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper CORS
- Secure environment variables
- Regular security audits

### Error Handling
- Never expose internal errors
- Log detailed errors internally
- Return generic error messages
- Implement proper error codes
- Monitor error rates

## Testing Rules

### Unit Testing
- Test all business logic
- Mock external dependencies
- Use descriptive test names
- Test error conditions
- Aim for high coverage

### Integration Testing
- Test GraphQL operations end-to-end
- Use test database
- Test authentication flows
- Verify data integrity
- Test error scenarios

### Test Organization
- Tests alongside source code
- Use `__tests__` folders
- Mirror source code structure
- Use factory functions for test data
- Clean up after tests

## Documentation Rules

### Module Documentation Standards
- Every module must have a comprehensive `README.md` file in its root directory
- Every sub-module must have its own `README.md` file
- Follow standardized documentation structure for consistency
- Keep documentation updated with implementation progress
- Include usage examples and API references

#### Required Module README Structure
```markdown
# [Module Name] Module

## Purpose
Clear description of the module's responsibility and business domain.

## Progress
- [ ] Core service implementation
- [ ] GraphQL resolvers
- [ ] Validation schemas
- [ ] Type definitions
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation

## Architecture
Description of module structure, sub-modules, and organization.

## API Reference
### Services
- List of main service functions
- Function signatures and descriptions

### GraphQL Operations
- Queries available
- Mutations available
- Types exported

### Types
- Key TypeScript interfaces and types

## Usage Examples
```typescript
// Code examples showing module usage
```

## Testing
- How to run module tests
- Coverage information
- Testing patterns used

## Dependencies
### Internal Dependencies
- Other modules this depends on
- Database tables used

### External Dependencies
- Third-party libraries used
- External APIs integrated

## Future Plans
- Planned features
- Potential improvements
- Known technical debt
```

#### Required Sub-Module README Structure
```markdown
# [Sub-Module Name] Sub-Module

## Purpose
Specific functionality provided by this sub-module.

## Progress
- [ ] Core functions implemented
- [ ] Types and schemas defined
- [ ] Tests written
- [ ] Documentation complete

## API
### Functions
- List of functions provided
- Function signatures

### Types
- TypeScript types defined

### Schemas
- Zod validation schemas

## Usage
```typescript
// Examples of using this sub-module
```

## Testing
- Sub-module specific tests
- How to run tests

## Integration
- How this integrates with main module
- Dependencies on other sub-modules
```

### Code Documentation
- Document complex business logic
- Use JSDoc for public APIs
- Explain why, not just what
- Keep comments up to date
- Remove obsolete comments

### API Documentation
- Document all GraphQL types
- Provide usage examples
- Document error conditions
- Keep changelog updated
- Version breaking changes

### Project Documentation
- Keep README current
- Document setup procedures
- Explain architecture decisions
- Provide troubleshooting guide
- Document deployment process

## Git Rules

### Commit Messages
- Use conventional commits format
- Start with type: feat, fix, docs, etc.
- Be descriptive but concise
- Reference issues when applicable
- Use imperative mood

### Branch Naming
- Use feature/ for new features
- Use fix/ for bug fixes
- Use docs/ for documentation
- Use refactor/ for code refactoring
- Include issue number when applicable

### Pull Requests
- Use descriptive titles
- Include detailed description
- Add screenshots for UI changes
- Request appropriate reviews
- Ensure CI passes before merge

## Deployment Rules

### Environment Configuration
- Use environment variables for config
- Validate environment variables
- Different configs per environment
- Secure secrets management
- Document required variables

### Database Migrations
- Use Prisma migrations
- Test migrations in staging
- Backup before production migrations
- Document breaking schema changes
- Plan rollback procedures

### Monitoring
- Log all important events
- Monitor application performance
- Set up error alerts
- Track business metrics
- Monitor database performance

## Enforcement

### Code Review Requirements
- All code must be reviewed
- Check adherence to these rules
- Verify test coverage
- Validate security practices
- Ensure documentation updates

### Automated Checks
- TypeScript strict mode enabled
- Biome linting and formatting
- Automated test execution
- Security vulnerability scanning
- Performance monitoring

### Rule Updates
- Rules can only be updated via PR
- Updates require team discussion
- Document rationale for changes
- Update tooling to match rules
- Communicate changes to team
