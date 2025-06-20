"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Globe, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key === "u") {
        event.preventDefault()
        window.location.href = "/read.html"
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">LinguaLearn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              Quiz
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                Dictionary
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/dictionary/spanish" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  Spanish Dictionary
                </Link>
                <Link href="/dictionary/french" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  French Dictionary
                </Link>
                <Link href="/dictionary/german" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  German Dictionary
                </Link>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/quiz" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Quiz
              </Link>
              <Link href="/dictionary/spanish" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Spanish Dictionary
              </Link>
              <Link href="/dictionary/french" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                French Dictionary
              </Link>
              <Link href="/dictionary/german" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                German Dictionary
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
