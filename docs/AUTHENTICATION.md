# Authentication System Documentation

## Overview

CheapDeals uses Firebase Authentication to provide secure user authentication with multiple sign-in methods including email/password, Google, and Facebook authentication.

## Architecture

### Components Structure
```
src/
├── contexts/
│   └── AuthContext.jsx          # Global authentication state management
├── services/
│   └── authService.js           # Firebase authentication service layer
├── pages/
│   ├── SignIn/
│   │   └── SignInForm.jsx       # Sign in form component
│   └── SignUp/
│       └── SignUpForm.jsx       # Sign up form component
└── components/
    └── shared/
        ├── SocialLoginButton.jsx # Reusable social login button
        └── SocialIcons.jsx       # Social media icons
```

## Authentication Methods

### 1. Email/Password Authentication

#### Sign Up
```javascript
const result = await signup(email, password, displayName);
if (result.success) {
  // User successfully created
  navigate("/home");
} else {
  // Handle error
  setError(result.error);
}
```

#### Sign In
```javascript
const result = await login(email, password);
if (result.success) {
  // User successfully signed in
  navigate("/home");
} else {
  // Handle error
  setError(result.error);
}
```

### 2. Google Authentication

#### Implementation
```javascript
const result = await loginWithGoogle();
if (result.success) {
  // User successfully signed in with Google
  navigate("/home");
} else {
  // Handle error
  setError(result.error);
}
```

#### Features
- Popup-based authentication
- Automatic profile information retrieval
- Error handling for popup blocking and network issues

### 3. Facebook Authentication

#### Implementation
```javascript
const result = await loginWithFacebook();
if (result.success) {
  // User successfully signed in with Facebook
  navigate("/home");
} else {
  // Handle error
  setError(result.error);
}
```

#### Features
- Popup-based authentication
- Requests email and public_profile permissions
- Comprehensive error handling

## Error Handling

### Automatic Error Clearing
All authentication errors are automatically cleared after 3 seconds to improve user experience.

### Error Types and Messages

#### Email/Password Errors
- `auth/email-already-in-use`: "This email address is already registered. Please use a different email or try signing in."
- `auth/weak-password`: "Password is too weak. Please choose a stronger password."
- `auth/invalid-email`: "Please enter a valid email address."
- `auth/user-not-found`: "No account found with this email address. Please check your email or sign up."
- `auth/wrong-password`: "Incorrect password. Please try again."

#### Social Authentication Errors
- `auth/popup-closed-by-user`: "Sign in was cancelled. Please try again."
- `auth/popup-blocked`: "Popup was blocked by your browser. Please allow popups and try again."
- `auth/account-exists-with-different-credential`: "An account already exists with the same email address but different sign-in credentials."

## State Management

### AuthContext
The `AuthContext` provides global authentication state management:

```javascript
const {
  currentUser,      // Current authenticated user object
  loading,          // Loading state during auth operations
  error,            // Current error message (auto-clears after 3s)
  signup,           // Email/password sign up function
  login,            // Email/password sign in function
  loginWithGoogle,  // Google authentication function
  loginWithFacebook,// Facebook authentication function
  logout,           // Sign out function
  forgotPassword    // Password reset function
} = useAuth();
```

### User Object Structure
```javascript
{
  uid: "user-unique-id",
  email: "user@example.com",
  displayName: "User Name",
  photoURL: "https://profile-photo-url.com",
  emailVerified: true
}
```

## Form Validation

### Client-side Validation
- Email format validation using regex
- Password minimum length (6 characters)
- Full name minimum length (2 characters)
- Password confirmation matching

### Validation Functions
```javascript
// Located in src/utils/validation.js
validateEmail(email)           // Returns error message or empty string
validatePassword(password)     // Returns error message or empty string
validateFullName(fullName)     // Returns error message or empty string
validateConfirmPassword(password, confirmPassword) // Returns error message or empty string
```

## Security Features

### Password Requirements
- Minimum 6 characters
- Additional complexity rules can be added in validation.js

### Session Management
- Firebase handles session persistence automatically
- Users remain signed in across browser sessions
- Secure token refresh handled by Firebase

### Data Protection
- User passwords are never stored locally
- All authentication handled by Firebase servers
- HTTPS encryption for all authentication requests

## UI Components

### SocialLoginButton
Reusable component for social authentication buttons:

```javascript
<SocialLoginButton
  provider="facebook"           // "google", "facebook", "whatsapp"
  onClick={handleFacebookSignIn}
  disabled={loading}
  icon={<FacebookIcon size={18} />}
  style={{ flex: 1, maxWidth: "80px" }}
/>
```

### Loading States
- Full-screen loading overlay during authentication
- Button disabled states during operations
- Loading spinners with custom messages

## Testing

### Error Simulation
Use the test utility for simulating authentication errors:

```javascript
// src/utils/testAuthErrors.js
import { simulateFirebaseError, testErrorHandling } from './testAuthErrors';

// Test specific error
const error = simulateFirebaseError('auth/email-already-in-use');

// Test all error types
testErrorHandling();
```

## Configuration

### Firebase Setup
Ensure the following are configured in Firebase Console:
1. Authentication providers enabled (Email/Password, Google, Facebook)
2. Authorized domains added
3. OAuth redirect URIs configured
4. Facebook App ID and App Secret configured

### Environment Variables
Required environment variables in `.env`:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## Best Practices

### Error Handling
- Always handle both success and error cases
- Provide user-friendly error messages
- Log errors for debugging while showing clean messages to users

### User Experience
- Show loading states during authentication
- Auto-clear errors after 3 seconds
- Provide clear navigation after successful authentication

### Security
- Validate all inputs on both client and server side
- Use Firebase security rules for data access control
- Regularly update Firebase SDK and dependencies

## Troubleshooting

### Common Issues
1. **Popup blocked**: Ensure popups are allowed for the domain
2. **Network errors**: Check internet connection and Firebase configuration
3. **Facebook login fails**: Verify Facebook app configuration and domain settings
4. **Email already exists**: Guide users to sign in instead of sign up

### Debug Mode
Enable debug logging by setting:
```javascript
// In development
console.log("Auth debug mode enabled");
```

## Future Enhancements

### Planned Features
- Phone number authentication
- Multi-factor authentication (MFA)
- Social login with additional providers (Twitter, GitHub)
- Enhanced password requirements
- Account linking for multiple providers

### Performance Optimizations
- Lazy loading of authentication providers
- Caching of user profile information
- Optimized bundle size for authentication modules
