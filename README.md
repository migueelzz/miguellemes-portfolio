# Miguel Lemes - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🌍 **Internationalization**: Support for English and Portuguese
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🎨 **Modern UI**: Clean, elegant design with glassmorphism effects
- 📄 **CV Download**: Smart CV download based on selected language
- 🔗 **Social Links**: Integrated social media profiles

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **i18next** - Internationalization framework
- **Lucide React** - Beautiful icons
- **Country Flag Icons** - Real country flags

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd elegant-fold-folio

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/              # Reusable UI components
│   └── portfolio-hero.tsx # Main hero section
├── locales/             # Translation files
│   ├── en/              # English translations
│   └── pt/              # Portuguese translations
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── pages/               # Page components
```

## Deployment

The project can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your repository
- **GitHub Pages**: Use GitHub Actions
- **Any static host**: Build with `npm run build`

## Customization

### Adding New Languages

1. Create a new translation file in `src/locales/[language]/translation.json`
2. Update the language configuration in `src/i18n.ts`
3. Add the new language to the language switcher

### Styling

The project uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.ts` - Tailwind configuration
- `src/index.css` - Global styles
- Component-specific classes

## License

This project is open source and available under the [MIT License](LICENSE).
