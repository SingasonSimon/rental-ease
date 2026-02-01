"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-primary">
                    RentalManager
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <Link href="/listings" className="text-foreground/80 hover:text-foreground transition-colors">
                        Listings
                    </Link>
                    <div className="h-6 w-px bg-border mx-2" />
                    <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Register
                    </Link>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center space-x-4">
                    <ThemeToggle />
                    <button onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-b bg-background">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/listings" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
                            Listings
                        </Link>
                        <hr className="border-border" />
                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-foreground/80 hover:text-foreground">
                            Login
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)} className="text-primary font-medium">
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
