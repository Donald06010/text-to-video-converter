# Text-to-Video Converter

A modern, minimalistic web application that converts text to video using a clean card-based UI.

## Features

- **Clean Interface**: Centered card layout with modern design
- **Text Input**: Large textarea with character counter (max 5000 characters)
- **Real-time Processing**: API polling with loading states
- **Error Handling**: Clear error messages with red alert styling
- **Download Functionality**: Direct video download when ready
- **Persistent State**: Resumes processing after page refresh using localStorage
- **Reset Option**: Clear all data and return to initial state

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Integration

The app expects these API endpoints:
- `POST /api/convert` - Submit text for conversion
- `GET /api/status/:id` - Check processing status

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner