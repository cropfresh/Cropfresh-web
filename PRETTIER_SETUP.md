# Prettier Configuration for CropFresh Web

## Overview

Prettier has been successfully installed and configured for this Angular project to ensure consistent code formatting across the team.

## What's Installed

- **prettier**: The core Prettier formatter
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule
- **husky**: Git hooks for automation
- **lint-staged**: Run formatters on staged files

## Configuration Files

- **`.prettierrc`**: Main Prettier configuration
- **`.prettierignore`**: Files to exclude from formatting
- **`.vscode/settings.json`**: VS Code integration settings
- **`.vscode/extensions.json`**: Recommended extensions
- **`package.json`**: Updated with new scripts and lint-staged config

## Available Scripts

```bash
# Format all files in src directory
npm run format

# Check if files are formatted (useful for CI/CD)
npm run format:check

# Format only staged files (used by pre-commit hook)
npm run format:staged

# Run ESLint (now works with Prettier)
npm run lint
```

## Prettier Configuration

The project uses these Prettier settings:

```json
{
  "semi": true,                    // Use semicolons
  "trailingComma": "es5",         // Trailing commas where valid in ES5
  "singleQuote": true,            // Use single quotes
  "printWidth": 80,               // Line width
  "tabWidth": 2,                  // 2 spaces for indentation
  "useTabs": false,               // Use spaces, not tabs
  "bracketSpacing": true,         // Spaces in object literals
  "arrowParens": "avoid",         // Avoid parens in arrow functions
  "endOfLine": "lf"               // Use LF line endings
}
```

Special rules for Angular templates:
- HTML files use 120 character line width
- Angular parser for component templates

## Pre-commit Hooks

Husky is configured to automatically format and lint staged files before each commit:

1. Prettier formats all staged `.ts`, `.html`, `.css`, `.scss`, `.json`, `.md` files
2. ESLint fixes all staged TypeScript files

## VS Code Integration

The workspace is configured to:
- Format files automatically on save
- Use Prettier as the default formatter
- Fix ESLint issues on save
- Show rulers at 80 and 120 characters

### Required VS Code Extensions

Install these recommended extensions:
- Prettier - Code formatter (`esbenp.prettier-vscode`)
- ESLint (`dbaeumer.vscode-eslint`)
- Angular Language Service (`angular.ng-template`)
- TypeScript Importer (`ms-vscode.vscode-typescript-next`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)

## Usage Guidelines

### For New Files
- Files will be automatically formatted when saved in VS Code
- Pre-commit hooks will ensure formatting before commits

### For Existing Files
- All files have been formatted with the initial setup
- Use `npm run format` to format all files at once
- Use `npm run format:check` to verify formatting

### Team Workflow
1. Write code normally
2. Save file (auto-formats in VS Code)
3. Commit changes (pre-commit hook formats and lints)
4. Push to repository

## Troubleshooting

### VS Code Not Formatting
1. Ensure Prettier extension is installed
2. Check that VS Code is using Prettier as default formatter
3. Verify `.prettierrc` file exists in project root

### Pre-commit Hook Not Running
```bash
# Reinstall husky hooks
npx husky install
```

### Format Check Failing in CI
```bash
# Check which files need formatting
npm run format:check

# Format all files
npm run format
```

### ESLint Conflicts with Prettier
The configuration already handles this with `eslint-config-prettier`. If you encounter conflicts:
1. Check that your ESLint config includes the prettier config
2. Verify ESLint rules don't conflict with Prettier formatting

## Benefits

- **Consistency**: All code follows the same formatting standards
- **Productivity**: No more debates about code style
- **Quality**: Automatic formatting reduces review time
- **Integration**: Works seamlessly with existing tools
- **Automation**: Formatting happens automatically without thinking

## Next Steps

1. Make sure all team members install recommended VS Code extensions
2. Set up CI/CD pipeline to check formatting (`npm run format:check`)
3. Consider adding Prettier check to pull request requirements
4. Train team on new workflow and available scripts

 