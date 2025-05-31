# Auth Module

## Purpose

The Auth module handles all authentication and authorization operations for the Tamatar platform. It provides secure, token-based authentication with email verification, session management, and account recovery features.

## Progress

- [ ] Core service implementation
- [x] Public routes configuration
- [x] JWT token utilities
- [x] Password hashing utilities
- [x] Username generation utilities
- [ ] Login/logout functionality
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Session management
- [ ] Multi-device login support
- [ ] Unit tests
- [ ] Integration tests
- [ ] Documentation

## Architecture

The Auth module follows a simple module structure with specialized service files for different authentication operations:

```
auth/
├── index.ts           # Main exports
├── routes.ts          # Public Hono routes
├── schema.ts          # Zod validation schemas
├── README.md          # This documentation
├── services/          # Authentication service implementations
│   ├── login.ts         # User login functionality
│   ├── logout.ts        # User logout (session invalidation)
│   ├── signup.ts        # New user registration
│   ├── refresh.ts       # Token refresh operations
│   ├── verify.ts        # Email verification
│   └── forgot-password.ts # Password reset flow
└── utils/             # Authentication utilities
    ├── jwt.ts           # JWT token generation and validation
    ├── password.ts      # Password hashing and verification
    └── username.ts      # Username generation from email
```

## API Reference

### Routes

The Auth module exposes the following public HTTP routes:

* `POST /auth/signup` - Register a new user
* `POST /auth/login` - Authenticate a user and get tokens
* `POST /auth/refresh` - Get a new access token using refresh token
* `POST /auth/logout` - Invalidate current session
* `POST /auth/logout-all` - Invalidate all sessions for user
* `POST /auth/verify-email` - Verify user's email address
* `POST /auth/forgot-password` - Request password reset email
* `POST /auth/reset-password` - Reset password with token

### Services

#### Login Service
- `loginUser(email: string, password: string): Promise<LoginResponse>` - Authenticates user and returns tokens

#### Signup Service
- `createUser(email: string, password: string): Promise<CreateUserResponse>` - Registers new user and sends verification email
- `generateUsername(email: string): string` - Creates a unique username from email

#### Refresh Service
- `refreshToken(refreshToken: string): Promise<RefreshResponse>` - Validates refresh token and issues new access token

#### Logout Service
- `logoutSession(sessionId: string): Promise<void>` - Invalidates a specific session
- `logoutAllSessions(userId: string): Promise<void>` - Invalidates all sessions for user

#### Verify Service
- `generateVerificationToken(userId: string): Promise<string>` - Creates email verification token
- `verifyEmail(token: string): Promise<VerifyEmailResponse>` - Validates email verification token

#### Forgot Password Service
- `requestPasswordReset(email: string): Promise<void>` - Sends password reset email
- `resetPassword(token: string, newPassword: string): Promise<ResetPasswordResponse>` - Resets password with valid token

### Utilities

#### JWT Utilities
- `generateAccessToken(payload: JWTPayload): Promise<string>` - Generates JWT access token
- `generateRefreshToken(sessionId: string): Promise<string>` - Generates JWT refresh token
- `verifyToken(token: string): Promise<JWTPayload | null>` - Validates and decodes JWT token

#### Password Utilities
- `hashPassword(plainPassword: string): Promise<string>` - Hashes password securely
- `verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>` - Verifies password against hash

#### Username Utilities
- `generateUsernameFromEmail(email: string): string` - Extracts username from email
- `ensureUniqueUsername(baseUsername: string): Promise<string>` - Ensures username is unique by adding suffix if needed

## Types

```typescript
interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface SignupInput {
  email: string;
  password: string;
}

interface JWTPayload {
  userId: string;
  username: string;
  email: string;
}

interface RefreshInput {
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
}

interface Session {
  id: string;
  userId: string;
  deviceInfo?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}
```

## Usage Examples

### User Registration

```typescript
import { signupService } from '@/modules/auth/services/signup';

// Register a new user
async function registerUser(email: string, password: string) {
  try {
    const result = await signupService.createUser(email, password);
    console.log('User registered successfully:', result.user);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
}
```

### User Login

```typescript
import { loginService } from '@/modules/auth/services/login';

// Login a user
async function loginUser(email: string, password: string) {
  try {
    const { accessToken, refreshToken, user } = await loginService.loginUser(email, password);
    
    // Store tokens securely
    localStorage.setItem('accessToken', accessToken);
    
    console.log('Login successful:', user);
    return user;
  } catch (error) {
    console.error('Login failed:', error.message);
    throw error;
  }
}
```

### Token Refresh

```typescript
import { refreshService } from '@/modules/auth/services/refresh';

// Refresh access token
async function refreshAccessToken(refreshToken: string) {
  try {
    const { accessToken } = await refreshService.refreshToken(refreshToken);
    
    // Update stored access token
    localStorage.setItem('accessToken', accessToken);
    
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error.message);
    // Handle expired refresh token by redirecting to login
    window.location.href = '/login';
  }
}
```

## Testing

The Auth module includes both unit and integration tests:

```bash
# Run all auth tests
bun test src/modules/auth

# Run specific auth service tests
bun test src/modules/auth/services/login.test.ts
```

The tests cover:
- User registration with valid/invalid inputs
- Login with correct/incorrect credentials
- Token generation and validation
- Password hashing and verification
- Session creation and invalidation
- Email verification flow

## Dependencies

### Internal Dependencies
- Database schemas: `prisma/auth.prisma`
- Error handling: `src/lib/errors.ts`
- Email service: `src/emails`

### External Dependencies
- `jose`: JWT token generation and validation
- `ua-parser-js`: Device fingerprinting for sessions
- `zod`: Input validation
- `@plunk/node`: Email delivery

## Future Plans

- Implement two-factor authentication
- Add social login providers (GitHub, Google)
- Implement rate limiting for auth endpoints
- Add device management UI
- Add security notifications for suspicious logins
- Improve password requirements and validation
- Add support for login activity logging
