# Tamatar Development Best Practices

## Code Quality Standards

### TypeScript Guidelines
- **Always use strict mode**: Enable all strict TypeScript compiler options
- **Explicit return types**: Define return types for all functions and methods
- **Avoid `any` type**: Use proper typing or `unknown` when type is uncertain
- **Use type assertions sparingly**: Prefer type guards and proper typing
- **Export types**: Make types available for reuse across modules

```typescript
// ✅ Good
async function getUserById(id: string): Promise<User | null> {
  return await db.user.findUnique({ where: { id } })
}

// ❌ Bad  
async function getUserById(id: any): Promise<any> {
  return await db.user.findUnique({ where: { id } })
}
```

### Database Best Practices

#### Prisma Schema Design
- **Descriptive model names**: Use clear, domain-specific names
- **Proper relations**: Define all relationships with appropriate cascade options
- **Indexes for performance**: Add indexes on frequently queried fields
- **Timestamps everywhere**: Include `createdAt` and `updatedAt` on all models
- **Use enums for status fields**: Prefer enums over string literals

```prisma
// ✅ Good
model DailyLog {
  id        String   @id @default(cuid())
  title     String
  content   String
  status    LogStatus @default(DRAFT)
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, createdAt])
}

enum LogStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

#### Database Operations
- **Use transactions for multi-table operations**
- **Handle unique constraint violations gracefully**
- **Implement soft deletes for important data**
- **Use proper error handling for database operations**

```typescript
// ✅ Good - Transaction usage
async function createProjectWithLog(projectData: CreateProjectInput, logData: CreateLogInput) {
  return await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({ data: projectData })
    const log = await tx.dailyLog.create({ 
      data: { ...logData, projectId: project.id } 
    })
    return { project, log }
  })
}
```

### GraphQL Best Practices

#### Schema Design with Pothos
- **Use object refs for type safety**
- **Group related types in separate files**
- **Implement proper error handling**
- **Add field-level descriptions**
- **Use DataLoader for N+1 prevention**

```typescript
// ✅ Good - Pothos schema definition
export const UserType = builder.prismaObject('User', {
  description: 'A developer using the Tamatar platform',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    username: t.exposeString('username'),
    profile: t.relation('profile', { nullable: true }),
    projects: t.relation('projects'),
  }),
})
```

#### Resolver Patterns
- **Keep resolvers thin**: Move business logic to service layers
- **Use proper error types**: Throw GraphQL errors with appropriate codes
- **Validate inputs**: Use Zod schemas for all input validation
- **Handle authorization**: Check permissions at the field level

```typescript
// ✅ Good - Resolver structure
export const createProjectMutation = builder.mutationField('createProject', {
  type: ProjectType,
  args: {
    input: t.arg({ type: CreateProjectInputType, required: true }),
  },
  authScopes: { user: true },
  resolve: async (parent, { input }, { user, prisma }) => {
    // Validate input
    const validatedInput = createProjectSchema.parse(input)
    
    try {
      return await ProjectService.create(prisma, user.id, validatedInput)
    } catch (error) {
      throw new GraphQLError('Failed to create project', {
        extensions: { code: 'PROJECT_CREATION_FAILED' }
      })
    }
  },
})
```

### Validation with Zod

#### Schema Organization
- **Create reusable schemas**: Define base schemas and extend them
- **Use transform methods**: Normalize data during validation
- **Provide clear error messages**: Custom error messages for better UX
- **Export inferred types**: Make TypeScript types available

```typescript
// ✅ Good - Zod schema patterns
export const baseUserSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
           'Password must contain uppercase, lowercase, and number'),
})

export const registerSchema = baseUserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type RegisterInput = z.infer<typeof registerSchema>
```

## Security Best Practices

### Authentication & Authorization
- **Hash passwords properly**: Use bcrypt with sufficient rounds (12+)
- **Implement proper JWT handling**: Short-lived tokens with secure storage
- **Validate tokens thoroughly**: Check expiration, signature, and claims
- **Use role-based access control**: Implement granular permissions

### Input Validation
- **Validate all inputs**: Never trust client-side data
- **Sanitize user content**: Prevent XSS attacks in user-generated content
- **Implement rate limiting**: Protect against abuse and DoS attacks
- **Use CORS properly**: Configure allowed origins carefully

### Data Protection
- **Log security events**: Track authentication attempts and failures
- **Implement audit trails**: Track data modifications with user context
- **Use environment variables**: Never hardcode secrets in code
- **Encrypt sensitive data**: Use proper encryption for PII

## Performance Guidelines

### Database Performance
- **Optimize queries**: Use `select` to limit returned fields
- **Implement pagination**: Use cursor-based pagination for large datasets
- **Use indexes wisely**: Index frequently queried and sorted fields
- **Monitor query performance**: Log slow queries and optimize them

```typescript
// ✅ Good - Optimized query
async function getUserProjects(userId: string, cursor?: string) {
  return await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
      _count: { select: { dailyLogs: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  })
}
```

### GraphQL Performance
- **Use DataLoader**: Batch and cache database queries
- **Implement query complexity analysis**: Prevent expensive queries
- **Cache expensive operations**: Use Redis for computed results
- **Optimize field resolvers**: Avoid N+1 queries

### Caching Strategies
- **Database query caching**: Cache expensive aggregations
- **Session caching**: Store user sessions in Redis
- **Static asset caching**: Use CDN for images and files
- **API response caching**: Cache stable data with appropriate TTL

## Error Handling Patterns

### GraphQL Errors
- **Use proper error codes**: Categorize errors appropriately
- **Provide helpful messages**: User-friendly error descriptions
- **Include context**: Add relevant data to error extensions
- **Log errors appropriately**: Different log levels for different error types

```typescript
// ✅ Good - Error handling pattern
export class TamatarError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400,
    public field?: string
  ) {
    super(message)
    this.name = 'TamatarError'
  }
  
  toGraphQLError(): GraphQLError {
    return new GraphQLError(this.message, {
      extensions: {
        code: this.code,
        field: this.field,
        timestamp: new Date().toISOString(),
      }
    })
  }
}
```

### Database Error Handling
- **Handle unique constraint violations**: Provide user-friendly messages
- **Catch connection errors**: Implement retry logic where appropriate
- **Log database errors**: Include query context in logs
- **Use transactions for consistency**: Rollback on errors

## Testing Standards

### Unit Testing
- **Test business logic**: Focus on service layer testing
- **Mock external dependencies**: Use proper mocking for database and APIs
- **Test error conditions**: Ensure error handling works correctly
- **Use descriptive test names**: Make test purpose clear

```typescript
// ✅ Good - Test structure
describe('ProjectService', () => {
  describe('create', () => {
    it('should create project with valid input', async () => {
      const mockPrisma = createMockPrisma()
      const input = { name: 'Test Project', description: 'Test' }
      
      const result = await ProjectService.create(mockPrisma, 'user123', input)
      
      expect(result.name).toBe('Test Project')
      expect(mockPrisma.project.create).toHaveBeenCalledWith({
        data: expect.objectContaining(input)
      })
    })
    
    it('should throw error for duplicate project name', async () => {
      const mockPrisma = createMockPrisma()
      mockPrisma.project.create.mockRejectedValue(
        new PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '5.0.0'
        })
      )
      
      await expect(
        ProjectService.create(mockPrisma, 'user123', { name: 'Existing' })
      ).rejects.toThrow('Project name already exists')
    })
  })
})
```

### Integration Testing
- **Test GraphQL operations end-to-end**
- **Use test database**: Separate database for testing
- **Test authentication flows**: Verify token handling
- **Test database constraints**: Ensure data integrity

## Code Organization

### File Naming
- **Use kebab-case**: For files and directories
- **Be descriptive**: `user-service.ts` not `service.ts`
- **Group by feature**: Organize files by business domain
- **Use index files**: Export modules cleanly

### Module Structure
```typescript
// ✅ Good - Module organization
src/
├── modules/
│   ├── users/
│   │   ├── user.service.ts      # Business logic
│   │   ├── user.resolvers.ts    # GraphQL resolvers
│   │   ├── user.types.ts        # TypeScript types
│   │   ├── user.schemas.ts      # Zod validation schemas
│   │   └── __tests__/           # Module tests
│   │       ├── user.service.test.ts
│   │       └── user.resolvers.test.ts
│   └── projects/
│       ├── project.service.ts
│       ├── project.resolvers.ts
│       ├── project.types.ts
│       └── project.schemas.ts
```

### Import Organization
- **Use absolute imports**: Configure path mapping in TypeScript
- **Group imports logically**: External, internal, relative
- **Use barrel exports**: Export from index files
- **Avoid circular dependencies**: Design clear dependency graphs

```typescript
// ✅ Good - Import organization
// External libraries
import { GraphQLError } from 'graphql'
import { z } from 'zod'

// Internal modules
import { prisma } from '@/lib/prisma'
import { logger } from '@/utils/logger'
import { validateInput } from '@/utils/validation'

// Local imports
import { CreateProjectInput } from './project.types'
import { createProjectSchema } from './project.schemas'
```

## Documentation Standards

### Code Documentation
- **Use JSDoc comments**: Document complex functions
- **Explain business logic**: Why, not just what
- **Document error conditions**: When functions throw errors
- **Keep comments up to date**: Remove obsolete comments

### API Documentation
- **GraphQL schema descriptions**: Add descriptions to all types and fields
- **Example usage**: Provide examples in documentation
- **Error documentation**: Document possible errors and solutions
- **Keep changelog**: Track API changes and breaking changes

## Deployment & Operations

### Environment Management
- **Use environment-specific configs**: Different settings per environment
- **Validate environment variables**: Use Zod to validate env vars
- **Secure secrets management**: Use proper secret management tools
- **Document environment setup**: Clear setup instructions

### Monitoring & Observability
- **Structured logging**: Use consistent log formats
- **Performance monitoring**: Track response times and database queries
- **Error tracking**: Monitor and alert on error rates
- **Health checks**: Implement proper health check endpoints

### Backup & Recovery
- **Regular database backups**: Automated backup procedures
- **Test recovery procedures**: Regularly test backup restoration
- **Document disaster recovery**: Clear procedures for outages
- **Monitor backup integrity**: Verify backup completeness
