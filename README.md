# Hikely - Modern Hiking Image Gallery

A **stunning, responsive image gallery** built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Inspired by **Pexels** and **Pixabay**, Hikely delivers a **modern, performant, and accessible** experience for browsing breathtaking hiking photography.

![Hikely Gallery](https://img.shields.io/badge/Hikely-Gallery-10b981?style=for-the-badge&logo=mountain)  
![Next.js 14](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=next.js)  
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)  
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-1.0-1a1a1a?style=flat)

---

## Features

### Modern UI/UX
- **Glassmorphism & Backdrop Blur** – Subtle gradients and frosted glass effects
- **Dark / Light Mode** – System-aware with smooth toggle
- **Fully Responsive** – Pixel-perfect on mobile, tablet, and desktop
- **Micro-interactions** – Hover scales, smooth transitions, and touch feedback

### Advanced Search & Filtering
- **Real-time Search** – Instant results across titles, locations, and tags
- **Smart Filters** – By location, date, popularity, and more
- **Sort Options** – Newest, Most Liked, Most Downloaded
- **Tag Suggestions** – Dynamic popular tags from metadata

### Responsive Image Gallery
- **CSS Grid Masonry Layout** – Variable row/column spans for organic feel
- **Zero Whitespace on Mobile** – `grid-auto-flow: dense` fills every gap
- **Image Modal** – Fullscreen lightbox with metadata
- **Optimized Loading** – `next/image` with `priority`, `sizes`, and lazy loading

### Mobile-First Experience
- **Bottom Sheet Filters** – Swipe-up panel for filtering
- **Touch-Optimized UI** – Large tap targets, no hover dependency
- **Floating Quick Actions** – Download & Like buttons on mobile
- **No Empty Gaps** – Images pack tightly on small screens

---

## Quick Start

### Prerequisites
- Node.js 18.17+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/your-username/hikely-gallery.git
cd hikely-gallery
npm install
