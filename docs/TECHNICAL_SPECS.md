# Tamatar Technical Specifications

## System Architecture Overview

### Backend Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Hono Routes   │    │  GraphQL Yoga   │    │   Database      │
│   (Public API)  │    │  (Protected)    │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Prisma ORM     │
                    │  (Data Layer)   │
                    └─────────────────┘
```

### Tech Stack

#### Core Backend Technologies
- **Runtime**: Bun (JavaScript runtime and package manager)
- **Framework**: Hono (Fast web framework for public routes)
- **GraphQL**: GraphQL Yoga (GraphQL server)
- **Schema Builder**: Pothos (Type-safe GraphQL schema builder)
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod (Runtime type validation)
- **Authentication**: JWT with José library
- **Logging**: Pino (Structured logging)
- **Email**: React.Email + Pluck (Email templating and sending)

#### Development Tools
- **TypeScript**: Strict mode for type safety
- **Biome**: Code formatting and linting
- **Testing**: Bun test runner
- **Database Migrations**: Prisma Migrate

#### Future Infrastructure
- **Caching**: Redis for session management and caching
- **Search**: Elasticsearch for advanced search capabilities
- **File Storage**: AWS S3 or similar for file uploads
- **Monitoring**: Application performance monitoring
- **CI/CD**: GitHub Actions for automated deployment

## Database Design

### Core Models

#### User Management
```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  username        String   @unique
  password        String
  firstName       String?
  lastName        String?
  bio             String?
  profileImage    String?
  isVerified      Boolean  @default(false)
  role            Role     @default(USER)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  sessions        Session[]
  projects        Project[]
  dailyLogs       DailyLog[]
  resources       Resource[]
  following       Follow[] @relation("Follower")
  followers       Follow[] @relation("Following")
  githubProfile   GitHubProfile?
}

model Session {
  id          String   @id @default(cuid())
  userId      String
  deviceInfo  String?
  ipAddress   String?
  userAgent   String?
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Role {
  USER
  ADMIN
}
```

#### Project Management
```prisma
model Project {
  id          String        @id @default(cuid())
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  techStack   String[]
  startDate   DateTime?
  endDate     DateTime?
  githubUrl   String?
  liveUrl     String?
  userId      String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  dailyLogs   DailyLog[]
  repositories Repository[]
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}
```

#### Daily Logging
```prisma
model DailyLog {
  id          String   @id @default(cuid())
  title       String
  content     String
  date        DateTime
  mood        Int?     // 1-10 scale
  productivity Int?    // 1-10 scale
  userId      String
  projectId   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  project     Project?  @relation(fields: [projectId], references: [id])
  tags        Tag[]
  resources   Resource[]
  commits     Commit[]
}

model Tag {
  id        String     @id @default(cuid())
  name      String     @unique
  color     String?
  createdAt DateTime   @default(now())
  
  dailyLogs DailyLog[]
}
```

#### Resource Management
```prisma
model Resource {
  id          String       @id @default(cuid())
  title       String
  url         String
  description String?
  type        ResourceType
  difficulty  Difficulty?
  rating      Float?
  userId      String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  user        User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  dailyLogs   DailyLog[]
  categories  Category[]
  reviews     Review[]
}

enum ResourceType {
  ARTICLE
  VIDEO
  COURSE
  DOCUMENTATION
  TUTORIAL
  BOOK
  PODCAST
  TOOL
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

#### GitHub Integration
```prisma
model GitHubProfile {
  id            String   @id @default(cuid())
  githubId      Int      @unique
  username      String   @unique
  accessToken   String
  refreshToken  String?
  userId        String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  user          User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  repositories  Repository[]
}

model Repository {
  id            String        @id @default(cuid())
  githubId      Int           @unique
  name          String
  fullName      String
  description   String?
  language      String?
  stars         Int           @default(0)
  forks         Int           @default(0)
  isPrivate     Boolean       @default(false)
  url           String
  cloneUrl      String
  lastCommitAt  DateTime?
  projectId     String?
  githubProfileId String
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  project       Project?      @relation(fields: [projectId], references: [id])
  githubProfile GitHubProfile @relation(fields: [githubProfileId], references: [id], onDelete: Cascade)
  commits       Commit[]
  codeMetrics   CodeMetric[]
}

model Commit {
  id          String   @id @default(cuid())
  sha         String   @unique
  message     String
  author      String
  date        DateTime
  additions   Int      @default(0)
  deletions   Int      @default(0)
  changedFiles Int     @default(0)
  repositoryId String
  dailyLogId  String?
  createdAt   DateTime @default(now())
  
  repository  Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  dailyLog    DailyLog?  @relation(fields: [dailyLogId], references: [id])
}
```

### Advanced Models

#### Analytics & Learning
```prisma
model LearningPath {
  id          String   @id @default(cuid())
  title       String
  description String
  difficulty  Difficulty
  estimatedHours Int
  prerequisites String[]
  outcomes    String[]
  isPublic    Boolean  @default(false)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  steps       LearningStep[]
  enrollments LearningEnrollment[]
}

model Goal {
  id          String     @id @default(cuid())
  title       String
  description String?
  type        GoalType
  status      GoalStatus @default(ACTIVE)
  targetDate  DateTime?
  progress    Int        @default(0) // 0-100
  userId      String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  milestones  Milestone[]
}

enum GoalType {
  SKILL_DEVELOPMENT
  PROJECT_COMPLETION
  LEARNING_PATH
  CAREER_MILESTONE
  HABIT_FORMATION
}

enum GoalStatus {
  ACTIVE
  COMPLETED
  PAUSED
  CANCELLED
}
```

#### Community Features
```prisma
model Follow {
  id          String   @id @default(cuid())
  followerId  String
  followingId String
  createdAt   DateTime @default(now())
  
  follower    User     @relation("Follower", fields: [followerId], references: [id], onDelete: Cascade)
  following   User     @relation("Following", fields: [followingId], references: [id], onDelete: Cascade)
  
  @@unique([followerId, followingId])
}

model Review {
  id         String   @id @default(cuid())
  rating     Int      // 1-5 scale
  comment    String?
  userId     String
  resourceId String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  
  @@unique([userId, resourceId])
}
```

## API Design

### GraphQL Schema Structure

#### Query Structure
```graphql
type Query {
  # User queries
  me: User
  user(id: ID!): User
  users(first: Int, after: String): UserConnection
  
  # Project queries
  project(id: ID!): Project
  myProjects: [Project!]!
  
  # Daily log queries
  dailyLog(id: ID!): DailyLog
  myDailyLogs(date: Date, projectId: ID): [DailyLog!]!
  
  # Resource queries
  resource(id: ID!): Resource
  resources(category: String, difficulty: Difficulty): [Resource!]!
  
  # GitHub queries
  myRepositories: [Repository!]!
  repository(id: ID!): Repository
}
```

#### Mutation Structure
```graphql
type Mutation {
  # Authentication
  updateProfile(input: UpdateProfileInput!): User!
  
  # Project mutations
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
  
  # Daily log mutations
  createDailyLog(input: CreateDailyLogInput!): DailyLog!
  updateDailyLog(id: ID!, input: UpdateDailyLogInput!): DailyLog!
  deleteDailyLog(id: ID!): Boolean!
  
  # Resource mutations
  createResource(input: CreateResourceInput!): Resource!
  updateResource(id: ID!, input: UpdateResourceInput!): Resource!
  deleteResource(id: ID!): Boolean!
  
  # Social mutations
  followUser(userId: ID!): Boolean!
  unfollowUser(userId: ID!): Boolean!
  
  # GitHub mutations
  connectGitHub(code: String!): GitHubProfile!
  syncRepositories: [Repository!]!
}
```

## Authentication & Security

### JWT Authentication Flow
1. **Registration**: User provides email/password, receives verification email
2. **Email Verification**: Click link to verify email address
3. **Login**: Exchange credentials for access token
4. **Token Usage**: Include token in Authorization header for GraphQL requests
5. **Token Expiration**: Tokens expire after 24 hours, require re-authentication

### Security Measures
- Password hashing with bcrypt (minimum 12 rounds)
- Email verification required for account activation
- JWT tokens with short expiration times
- Rate limiting on authentication endpoints
- Input validation with Zod schemas
- SQL injection prevention through Prisma ORM
- CORS configuration for allowed origins
- Helmet.js for security headers

### Session Management
- Track user sessions across devices
- Store device fingerprints and IP addresses
- Allow users to view and revoke active sessions
- Automatic session cleanup for expired tokens

## Data Validation

### Zod Schema Examples
```typescript
// User registration schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
           'Password must contain uppercase, lowercase, and number'),
})

// Daily log creation schema
export const createDailyLogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  date: z.date(),
  mood: z.number().int().min(1).max(10).optional(),
  productivity: z.number().int().min(1).max(10).optional(),
  projectId: z.string().cuid().optional(),
  tagIds: z.array(z.string().cuid()).optional(),
})

// Project creation schema
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(1000).optional(),
  techStack: z.array(z.string()).max(20),
  startDate: z.date().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
})
```

## Error Handling

### Error Classification
- **Validation Errors**: Input validation failures (400)
- **Authentication Errors**: Invalid or missing credentials (401)
- **Authorization Errors**: Insufficient permissions (403)
- **Not Found Errors**: Resource doesn't exist (404)
- **Server Errors**: Internal server issues (500)

### GraphQL Error Format
```typescript
type GraphQLErrorExtensions = {
  code: 'VALIDATION_ERROR' | 'UNAUTHENTICATED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_ERROR'
  field?: string // For validation errors
  timestamp: string
  requestId: string
}
```

## Performance Considerations

### Database Optimization
- Proper indexing on frequently queried fields
- Database connection pooling
- Query optimization with Prisma
- Pagination for large data sets
- Lazy loading for related data

### Caching Strategy
- Redis for session storage
- Query result caching for expensive operations
- Static asset caching with CDN
- Database query optimization

### API Performance
- DataLoader for N+1 query prevention
- Field-level authorization to prevent over-fetching
- Query complexity analysis and limiting
- Rate limiting to prevent abuse

## Monitoring & Logging

### Structured Logging with Pino
```typescript
logger.info({
  userId: user.id,
  action: 'CREATE_PROJECT',
  projectId: project.id,
  timestamp: new Date().toISOString(),
}, 'User created new project')
```

### Metrics to Track
- API response times
- Database query performance
- User engagement metrics
- Error rates and types
- Authentication success/failure rates

## Deployment Architecture

### Development Environment
- Local PostgreSQL database
- Bun for package management and runtime
- Hot reload for development
- Local email testing with Mailtrap

### Production Environment
- Containerized deployment (Docker)
- Managed PostgreSQL database
- Redis cluster for caching
- Load balancer for high availability
- CDN for static asset delivery
- Monitoring and alerting system

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."

# Authentication
JWT_SECRET="..."
JWT_EXPIRES_IN="24h"

# Email
SMTP_HOST="..."
SMTP_PORT="587"
SMTP_USER="..."
SMTP_PASS="..."

# GitHub OAuth
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# Application
NODE_ENV="production"
PORT="3000"
CORS_ORIGIN="https://tamatar.dev"
```
