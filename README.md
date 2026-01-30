# Placeholder Asset Generator

A client-side web application for generating custom placeholder images and videos for web development. Perfect for testing websites without waiting for final assets.

## Features

- **Image Generation**: Create placeholder images of any size with custom colors and text
- **Video Generation**: Generate placeholder videos with custom duration, dimensions, and styling
- **Live Preview**: See your placeholder in real-time as you adjust settings
- **Quick Presets**: One-click presets for common sizes (HD, Full HD, 4K, Instagram Story, etc.)
- **Customizable**: Full control over dimensions, colors, text, duration, and FPS
- **Privacy-First**: All processing happens in your browser - no data is sent to any server

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Select Asset Type**: Choose between Image or Video mode
2. **Set Dimensions**: Enter width and height, or use a quick preset
3. **Customize Colors**: Pick background and text colors using color pickers or hex codes
4. **Add Text** (optional): Enter custom text, or leave empty for auto-generated dimensions
5. **Configure Video Settings** (if generating video): Set duration in seconds and FPS
6. **Preview**: See a live preview of your placeholder
7. **Generate**: Click the generate button to download your asset

## Supported Formats

- **Images**: PNG format
- **Videos**: WebM format (VP8/VP9 codec)

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Generation**: HTML5 Canvas API
- **Video Generation**: Canvas API + MediaRecorder API

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (may have limitations with video codecs)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main application page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Label.tsx
│   ├── AssetTypeSelector.tsx
│   ├── ConfigurationPanel.tsx
│   ├── PreviewDisplay.tsx
│   └── SizePresets.tsx
└── hooks/
    ├── useImageGenerator.ts  # Image generation logic
    └── useVideoGenerator.ts  # Video generation logic
```

## License

MIT
