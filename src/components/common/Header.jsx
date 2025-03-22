import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "@/services/authApi"
import useLogout from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import { toast } from "sonner"

export default function Header() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [logout] = useLogoutMutation()
    const handleLogout = async () => {
        try {
            await logout().unwrap()
            useLogout()
            toast.success("Logged out successfully")
            navigate("/login")
        } catch (error) {
            console.error(error)
            toast.error("Failed to logout")
        }
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-white px-4 md:px-6">
            <div className="md:flex-1 flex-initial ml-8 md:ml-0">
                <form className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-white pl-8 md:w-[300px]" />
                </form>
            </div>
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <div className="h-8 w-8 p-2 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                    {user ? (
                                        <span>
                                            {user?.firstName?.[0]?.toUpperCase()}
                                            {user?.lastName?.[0]?.toUpperCase()}
                                        </span>
                                    ) : (
                                        "DP"
                                    )}
                                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

