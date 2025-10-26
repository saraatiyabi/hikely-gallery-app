// src/components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mountain,
  Sun,
  Moon,
  Search,
  User,
  Upload,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/className";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Discover", href: "/discover" },
    { name: "Categories", href: "/categories" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-slate-950/60">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300 group-hover:scale-105">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Hikely
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
                Nature Gallery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button - Desktop */}
            <IconButton
              className="hidden sm:flex"
              onClick={() => {
                /* Add search functionality */
              }}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </IconButton>

            {/* Upload Button - Desktop */}
            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-md shadow-green-500/25">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:inline">
                Welcome
              </span>
            </div>

            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative overflow-hidden"
            >
              <div className="relative transform transition-transform duration-500 hover:rotate-180">
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-600/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </IconButton>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden border-t border-slate-200/60 dark:border-slate-800/60 transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 rounded-lg transition-all duration-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:border-green-300 dark:hover:border-green-700 transition-all duration-200">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 dark:text-slate-500">
                <span>4K Quality</span>
                <span>•</span>
                <span>Free Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
