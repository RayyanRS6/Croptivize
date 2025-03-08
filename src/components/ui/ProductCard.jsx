import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function ProductCard({ product }) {
    return (
        <Card className="group overflow-hidden">
            <div className="relative aspect-[3/1]">
                <img
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    className="object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">${product.price}</p>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={() => {
                        toast.success("Added to cart!")
                    }}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

