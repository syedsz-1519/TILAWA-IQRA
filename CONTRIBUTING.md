# Contributing to TILAWA

Thank you for your interest in contributing to TILAWA! This guide explains how to contribute to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Submitting Changes](#submitting-changes)
6. [Code Standards](#code-standards)
7. [Commit Messages](#commit-messages)
8. [Pull Request Process](#pull-request-process)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. By participating, you agree to:

- Be respectful and inclusive
- Welcome diverse perspectives
- Give credit where appropriate
- Report violations respectfully

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Flutter** 3.13.0+ (for mobile development)
- **Git**
- **GitHub Account**

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/tilawa.git
cd tilawa

# Add upstream remote
git remote add upstream https://github.com/tilawa/tilawa.git
```

## Development Setup

### Backend Setup

```bash
cd apps/backend/server
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup

```bash
cd apps/web/frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Mobile Setup

```bash
cd apps/mobile/tilawa
flutter pub get
flutter run
```

## Making Changes

### Create Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Branch naming convention:
# feature/description
# bugfix/description
# docs/description
# refactor/description
```

### Development Workflow

```bash
# Make your changes
# Test locally
npm test          # Backend/Frontend
flutter test      # Mobile

# Format code
npm run format
dart format lib/

# Lint code
npm run lint
dart analyze lib/
```

## Submitting Changes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Dependencies, build, etc.

**Examples:**
```
feat(quran): add audio playback controls
fix(mobile): resolve hydration mismatch on home screen
docs(api): add authentication endpoints documentation
refactor(backend): extract validation logic to middleware
```

### Push Changes

```bash
# Push to your fork
git push origin feature/your-feature-name
```

## Code Standards

### TypeScript/JavaScript

```typescript
// Use TypeScript for type safety
interface User {
  id: string
  email: string
  name: string
}

// Use async/await
async function fetchUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`)
  return response.data
}

// Error handling
try {
  await fetchUser(id)
} catch (error) {
  console.error('Failed to fetch user:', error)
  throw new ApiException('User fetch failed', 500)
}
```

### Dart/Flutter

```dart
// Use meaningful variable names
final currentUser = await authService.getCurrentUser();

// Use null safety
String? maybeNullValue;

// Follow Flutter style guide
class MyWidget extends StatelessWidget {
  const MyWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Hello'),
    );
  }
}

// Error handling
try {
  final user = await repository.getUser(id);
} catch (e, stackTrace) {
  logger.error('Failed to fetch user', error: e, stackTrace: stackTrace);
  rethrow;
}
```

### Code Quality

- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **SOLID**: Single Responsibility, Open/Closed, etc.
- **Comments**: Explain WHY, not WHAT
- **Tests**: Write tests for new features

### Testing

```typescript
// Backend tests
describe('AuthService', () => {
  it('should register new user', async () => {
    const user = await authService.register({
      name: 'John',
      email: 'john@example.com',
      password: 'password123',
    })

    expect(user).toBeDefined()
    expect(user.email).toBe('john@example.com')
  })
})
```

## Pull Request Process

### Create Pull Request

1. Visit your fork on GitHub
2. Click "New Pull Request"
3. Base: `upstream:main`
4. Compare: `your-fork:feature-branch`
5. Fill in the PR template

### PR Template

```markdown
## Description
Brief description of changes

## Related Issue
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No breaking changes

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests pass
- [ ] No linting errors
```

### Review Process

1. Maintainers will review your PR
2. Request changes if needed
3. You respond to feedback
4. PR merged once approved

### Common Review Comments

**"Add type definitions"**:
```typescript
// ❌ Before
const user = await getUser(id)

// ✅ After
const user: User = await getUser(id)
```

**"Add error handling"**:
```typescript
// ❌ Before
const data = await api.get('/data')

// ✅ After
try {
  const data = await api.get('/data')
} catch (error) {
  logger.error('Failed to fetch data', error)
  throw new ApiException('Data fetch failed')
}
```

**"Add tests"**:
```typescript
// ✅ Add test case
it('should handle error gracefully', async () => {
  api.get.mockRejectedValue(new Error('Network error'))

  expect(() => fetchUser(id)).rejects.toThrow()
})
```

## Documentation

### Update Documentation

- API changes: Update `docs/api/API.md`
- Architecture changes: Update `docs/architecture/ARCHITECTURE.md`
- Deployment changes: Update `docs/deployment/DEPLOYMENT.md`
- Feature docs: Create new file in appropriate directory

### Documentation Format

```markdown
# Feature Name

## Overview
Brief description

## Usage
```typescript
// Code example
```

## API
- `method()` - Description
- `property` - Description

## Examples
### Example 1
```typescript
// Example code
```

## References
- [Link to docs](url)
```

## Reporting Issues

### Bug Reports

```markdown
## Description
What happened

## Expected Behavior
What should happen

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Environment
- OS: Windows 11
- Browser: Chrome 120
- Version: 1.0.0

## Screenshots
[Add screenshot]
```

### Feature Requests

```markdown
## Description
What feature to add

## Use Case
Why it's needed

## Suggested Implementation
How to implement

## Examples
Real-world usage examples
```

## Community

- **GitHub Discussions**: Ask questions, share ideas
- **GitHub Issues**: Report bugs, request features
- **Pull Requests**: Submit code changes
- **Email**: support@tilawa.app

## Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project README

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Quick Reference

### Common Commands

```bash
# Format code
npm run format      # Backend/Frontend
dart format lib/    # Mobile

# Lint code
npm run lint        # Backend/Frontend
dart analyze lib/   # Mobile

# Run tests
npm test            # Backend/Frontend
flutter test        # Mobile

# Build for production
npm run build       # Backend/Frontend
flutter build       # Mobile

# Check for issues
npm run check       # TypeScript check
```

### Useful Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Flutter Style Guide](https://dart.dev/guides/language/effective-dart/style)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Thank you for contributing to TILAWA!** 🙏

Your contributions make Islamic learning more accessible to millions of people worldwide.
