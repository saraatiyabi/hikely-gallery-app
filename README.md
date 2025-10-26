# 🏔️ Hikely - Modern Image Gallery

A beautiful, responsive image gallery built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by platforms like Pixabay and Pixels.com, featuring a modern UI with advanced search and filtering capabilities.

![Hikely Gallery](https://img.shields.io/badge/Hikely-Gallery-green) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🎨 Modern UI/UX
- **Glass Morphism Design** - Beautiful backdrop blur effects and gradients
- **Dark/Light Mode** - Seamless theme switching with system preference detection
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **Smooth Animations** - CSS transitions and hover effects throughout

### 🔍 Advanced Search & Filtering
- **Real-time Search** - Instant search across titles, tags, locations, and descriptions
- **Smart Filtering** - Category-based filtering with dynamic tag extraction
- **Multiple Sort Options** - Popular, Newest, Most Downloaded, Most Liked
- **Popular Tags** - Quick search suggestions based on image metadata

### 🖼️ Image Gallery
- **Responsive Grid** - Adaptive layout with variable aspect ratios
- **Masonry Layout** - Pinterest-style grid with different row spans
- **Image Modal** - Full-screen image viewing with smooth transitions
- **Optimized Loading** - Next.js Image optimization with priority loading

### 📱 Mobile Experience
- **Floating Mobile Menu** - Non-intrusive navigation overlay
- **Bottom Sheet Filters** - Easy-to-use filter panel on mobile
- **Touch-Optimized** - Large tap targets and smooth interactions
- **Progressive Disclosure** - Contextual interfaces for different screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hikely-gallery.git
   cd hikely-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (gallery)/          # Gallery route group
│   │   ├── layout.tsx      # Gallery layout
│   │   └── page.tsx        # Gallery main page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── gallery/
│   │   ├── ImageGrid.tsx   # Responsive image grid
│   │   ├── SearchBar.tsx   # Search functionality
│   │   └── FilterBar.tsx   # Filter and sort controls
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   └── ThemeProvider.tsx # Dark/light theme
│   └── ui/
│       └── IconButton.tsx  # Reusable button component
├── hooks/
│   ├── useSearch.ts        # Search functionality
│   ├── useFilter.ts        # Filtering logic
│   └── useGallery.ts       # Combined search & filter
├── lib/
│   ├── images.ts           # Image data and metadata
│   └── className.ts        # CSS class utilities
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🎯 Key Components

### ImageGrid
- Responsive masonry layout
- 2 columns (mobile), 3 columns (tablet), 4 columns (desktop)
- Variable aspect ratios and row spans
- Hover effects with image metadata

### SearchBar
- Real-time search across multiple fields
- Popular tag suggestions
- Mobile-optimized full-screen search
- Clear search functionality

### FilterBar
- Dynamic category filtering
- Multiple sort options
- Desktop: Inline filter chips with "More" expansion
- Mobile: Bottom sheet filter panel

### Navbar
- Sticky navigation with backdrop blur
- Theme toggle (dark/light mode)
- Mobile menu with floating overlay
- Responsive design

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Font**: Inter
- **Image Optimization**: Next.js Image component
- **State Management**: React Hooks (useState, useMemo)

## 🎨 Customization

### Adding New Images
Edit `src/lib/images.ts` to add new images:

```typescript
{
  id: "unique-id",
  title: "Image Title",
  description: "Image description",
  location: "Location name",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2", "tag3"],
  thumb: "/path/to/thumbnail.jpg",
  full: "/path/to/full-size.jpg",
  likes: 150,
  downloads: 75,
  author: {
    username: "photographer"
  },
  resolution: "4K"
}
```

### Styling
The project uses Tailwind CSS with custom design tokens:

```css
/* Primary Colors */
--color-green: #10b981;
--color-teal: #0d9488;
--color-emerald: #059669;

/* Background Gradients */
bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20
```

### Theme Customization
Edit `src/components/layout/ThemeProvider.tsx` to modify theme behavior.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (2 columns)
- **Tablet**: 768px - 1024px (3 columns)  
- **Desktop**: ≥ 1024px (4 columns)

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌟 Performance Features

- **Image Optimization**: Automatic WebP conversion and responsive sizing
- **Code Splitting**: Automatic component-based code splitting
- **Lazy Loading**: Images load as they enter viewport
- **Memoization**: Optimized re-renders with useMemo
- **SEO Optimized**: Meta tags and semantic HTML

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by Pixabay and Pixels.com
- Icons by Lucide React
- Built with Next.js and Tailwind CSS

## 📞 Support

If you have any questions or need help, please open an issue or contact the development team.

---

**Built with ❤️ using Next.js and Tailwind CSS**
