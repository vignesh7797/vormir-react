# Contributing to Vormir UI

Thank you for your interest in contributing to Vormir UI! We welcome contributions from the community.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vormir-react.git
   cd vormir-react
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/my-new-feature
   ```

## Development Workflow

### Running the development environment

```bash
# Build packages
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

### Creating a new component

1. Create the component directory in `packages/react/src/components/`
2. Implement the component with TypeScript
3. Add tests in `ComponentName.test.tsx`
4. Export the component from `packages/react/src/index.ts`
5. Update documentation

### Component Guidelines

- Use TypeScript with strict mode
- Follow the existing code style
- Write tests with React Testing Library
- Ensure accessibility (ARIA attributes, keyboard navigation)
- Support both light and dark modes
- Use Tailwind classes via the `cn()` utility
- Document props with JSDoc comments

### Testing

- Write unit tests for all components
- Test keyboard interactions
- Test accessibility with `jest-axe`
- Maintain >80% code coverage

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add loading state
fix(modal): resolve focus trap issue
docs(readme): update installation guide
chore(deps): upgrade react to 18.3
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Requests

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the changelog using Changesets:
   ```bash
   pnpm changeset
   ```
5. Push your branch and create a pull request
6. Link any related issues
7. Wait for review

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Changeset added (if applicable)
- [ ] No TypeScript errors
- [ ] Accessibility tested
- [ ] Works in both light and dark modes

## Code of Conduct

Please be respectful and considerate of others. We aim to foster an inclusive and welcoming community.

## Questions?

Feel free to open an issue for questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
