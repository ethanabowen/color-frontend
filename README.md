# Color Frontend

This is the frontend application for the Color project, built with React, TypeScript, and Tailwind CSS.

## Features

- Submit colors with first name
- Search colors by first name
- Responsive design
- Real-time search with debouncing
- Form validation
- Error handling
- Loading states

## Prerequisites

- Node.js 18.x
- npm 9.x or later

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# API endpoint URL
VITE_API_URL=http://localhost:3000
DEBUG=*
```

## Project Structure

``
color-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── NavBar.tsx
│   │   ├── ColorForm.tsx
│   │   └── SearchColors.tsx
│   ├── services/      # API client and utilities
│   │   └── api.ts
│   ├── types/        # TypeScript interfaces
│   │   └── api.ts
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── public/           # Static assets
├── tests/           # Test files
└── package.json     # Project dependencies
```

## Components

### NavBar
Navigation component with links to different pages.

### ColorForm
Form component for submitting colors.

Props:
- `onSuccess?: () => void` - Callback function when submission is successful

### SearchColors
Component for searching and displaying colors.

Features:
- Real-time search with debouncing
- Loading states
- Error handling
- Responsive grid layout

## API Integration

The frontend communicates with the backend through the `api.ts` service:

```typescript
// Submit a new color
submitColor(submission: ColorSubmission): Promise<ApiResponse<ColorSearchResult>>

// Search colors
searchColors(firstName?: string): Promise<ApiResponse<ColorSearchResult[]>>
```

## Styling

The application uses Tailwind CSS for styling:

- Custom theme configuration in `tailwind.config.js`
- Responsive design patterns
- Consistent color scheme
- Loading and error states

## Testing

### Component Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## CI/CD Pipeline

The frontend uses GitHub Actions for CI/CD:

1. **Test Job**:
   - Type checking
   - Component tests
   - E2E tests

2. **Build and Deploy Job** (main branch only):
   - Build React application
   - Deploy to S3
   - Invalidate CloudFront cache

Required GitHub Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and type checking
4. Submit a pull request

## License

MIT
