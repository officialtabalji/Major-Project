'use client'

import Link from 'next/link'
import { Home, User, LogIn } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Wanderlust</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link href="/host" className="text-gray-700 hover:text-primary transition-colors duration-200">
              Host
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-outline">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
