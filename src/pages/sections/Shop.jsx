import { useState } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ProductCard from "@/components/ui/ProductCard"
import ProductFilters from "@/components/ui/ProductFilters"

// Mock data - Replace with your API data
const products = [
    {
        id: 1,
        name: "Organic Plant Food",
        price: 29.99,
        description: "Premium organic fertilizer for healthy plant growth",
        category: "Fertilizers",
        image: "/placeholder.jpg",
        rating: 4.5,
        reviews: 128,
    },
    {
        id: 2,
        name: "Garden Tool Set",
        price: 49.99,
        description: "Complete set of essential gardening tools",
        category: "Tools",
        image: "/placeholder.jpg",
        rating: 4.8,
        reviews: 95,
    },
    // Add more products...
]

export default function Shop() {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-2 py-8 md:py-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Shop</h1>
                    <p className="mt-2 text-muted-foreground">Browse our collection of agricultural products</p>
                </div>

                {/* Search and Filter - Mobile */}
                <div className="flex gap-2 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>Narrow down your product search</SheetDescription>
                            </SheetHeader>
                            <ProductFilters className="mt-4 px-4" />
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1">
                        <Input placeholder="Search products..." />
                    </div>
                </div>

                {/* Search and Sort - Desktop */}
                <div className="hidden gap-4 md:flex">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search products..." className="w-[300px] pl-9" />
                    </div>
                    <Select defaultValue="featured">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
                {/* Filters - Desktop */}
                <div className="hidden md:block">
                    <ProductFilters />
                </div>

                {/* Product Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Load More Button */}
            <div className="mt-8 flex justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isLoading}
                    onClick={() => {
                        setIsLoading(true)
                        // Simulate loading more products
                        setTimeout(() => setIsLoading(false), 1000)
                    }}
                >
                    {isLoading ? (
                        <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Loading...
                        </>
                    ) : (
                        <>
                            Load More
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

