"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ]

  // Render nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md h-16"></nav>
  }

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-emerald-600 dark:text-emerald-400">Ismail.</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
            >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-500 md:p-0 dark:text-white md:dark:hover:text-emerald-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
             <li>
                <Link
                  href="/admin"
                   className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-500 md:p-0 dark:text-white md:dark:hover:text-emerald-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition-colors"
                >
                  Admin
                </Link>
             </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
