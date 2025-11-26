# Publishing to npm - Checklist

## Prerequisites

1. **Create npm account**: https://www.npmjs.com/signup
2. **Verify your email** on npm
3. **Login via CLI**:
   ```bash
   npm login
   ```

## Publishing Steps

### First Time Setup

1. **Verify package name is available**:
   ```bash
   npm search @vormir/react
   ```
   If taken, change name in `packages/react/package.json`

2. **Ensure you're logged in**:
   ```bash
   npm whoami
   ```

3. **Build the package**:
   ```bash
   cd /workspaces/vormir-react
   pnpm build
   ```

4. **Test the package locally** (optional):
   ```bash
   cd packages/react
   npm pack
   # This creates a .tgz file you can test
   ```

### Publishing

#### Option 1: Manual Publish (First Release)

```bash
cd /workspaces/vormir-react/packages/react
npm publish --access public
```

#### Option 2: Using Changesets (Recommended)

```bash
cd /workspaces/vormir-react

# 1. Create a changeset
pnpm changeset
# Select: @vormir/react
# Select: major (for v1.0.0)
# Write: "Initial release of Vormir UI"

# 2. Version the package
pnpm version-packages

# 3. Commit the changes
git add .
git commit -m "chore: release v1.0.0"

# 4. Publish
pnpm release
```

### After Publishing

Check your package:
- https://www.npmjs.com/package/@vormir/react
- Install test: `npm install @vormir/react`

## Status

- ✅ Package configured for npm
- ✅ Build system ready
- ✅ Access set to "public"
- ❌ NOT YET PUBLISHED

**You need to run the publishing steps above!**
