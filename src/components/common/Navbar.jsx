import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Leaf, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

const NAVIGATION_ITEMS = [
    { name: "Home", path: "/" },
    { name: "Disease Detection", path: "/detect" },
    { name: "Shop", path: "/shop" },
    { name: "Guide", path: "/guide" },
    { name: "Contact", path: "/contact" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const NavItems = ({ mobile = false }) => (
        <>
            {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item.path}>
                    <NavLink
                        to={item.path}
                        onClick={() => mobile && setIsOpen(false)}
                        className={({ isActive }) =>
                            isActive
                                ? mobile
                                    ? "block w-full rounded-md text-primary"
                                    : "text-primary"
                                : mobile
                                    ? "block w-full rounded-md"
                                    : undefined
                        }
                    >
                        <NavigationMenuLink className={`${mobile ? undefined : navigationMenuTriggerStyle()} bg-transparent`}>
                            {item.name}
                        </NavigationMenuLink>
                    </NavLink>
                </NavigationMenuItem>
            ))}
        </>
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between xl:px-2 md:px-5 px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <Leaf className="h-6 w-6" />
                    <span className="font-bold">Croptivize</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavItems />
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                {isOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 px-3">
                            <div className="flex flex-col mt-8">
                                <NavigationMenu className="block">
                                    <NavigationMenuList className="flex-col items-start">
                                        <NavItems mobile />
                                    </NavigationMenuList>
                                </NavigationMenu>

                                <div className="flex flex-col space-y-2 mt-4">
                                    <Button variant="ghost" asChild className="w-full justify-start">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button asChild className="w-full justify-start">
                                        <Link to="/signup">Sign Up</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}