export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-foreground">RentalManager</h3>
                        <p className="text-sm text-muted-foreground">
                            Simplifying property management for landlords and tenants. Secure, efficient, and transparent.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Listing</li>
                            <li>Pricing</li>
                            <li>About Us</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Twitter</li>
                            <li>LinkedIn</li>
                            <li>Facebook</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} RentalManager. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
