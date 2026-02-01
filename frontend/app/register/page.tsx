import Link from "next/link";
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">

            {/* Visual Side (Hidden on Mobile) */}
            <div className="hidden lg:block relative bg-muted order-last lg:order-last">
                <div className="absolute inset-0 bg-secondary/30" />
                <div className="absolute bottom-12 left-12 right-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Join the community.</h2>
                    <p className="text-lg text-muted-foreground">
                        Simplifying life for tenants and landlords. Start your journey with RentalManager today.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-12">
                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <h1 className="text-3xl font-bold">Create Account</h1>
                        <p className="text-muted-foreground">Get started with your free account.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <input
                                        id="firstName"
                                        type="text"
                                        placeholder="John"
                                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <input
                                        id="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="phone">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="+254 700 000000"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                    </div>

                    <div className="pt-4 text-center">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
