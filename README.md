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

Deployed on **Vercel**. The `api/` folder holds edge functions that keep the site in sync with GitHub without a redeploy:

| Endpoint | What it does | Refresh |
| --- | --- | --- |
| `/api/og` | Link preview image (Open Graph), using the current GitHub avatar | daily |
| `/api/pinned` | Repos pinned on the GitHub profile, shown in the Projects section | hourly |
| `/api/cv?lang=en\|pt` | Latest CV PDF from `migueelzz/migueelzz` → `cv/cv-miguel-lemes-{en,pt}.pdf` | 5 min |

Required env var on Vercel: `GITHUB_TOKEN` (a fine-grained token with read-only public access is enough).
Optional: `CV_REPO`, `CV_BRANCH`, `CV_DIR` to read the CV from somewhere else.

If GitHub is unavailable, the Projects section falls back to `src/data/projects.ts` and the CV to the PDFs in `public/`.
Entries in `src/data/projects.ts` also override the title/description/tech of a pinned repo with the same URL.

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
