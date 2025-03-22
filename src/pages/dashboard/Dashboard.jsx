import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowDown, ArrowUp, Bug, DollarSign, Package, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data
const salesData = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 1900 },
    { name: "Mar", total: 1500 },
    { name: "Apr", total: 1700 },
    { name: "May", total: 2500 },
    { name: "Jun", total: 2300 },
    { name: "Jul", total: 3000 },
]

const diseaseData = [
    { name: "Rust", value: 35 },
    { name: "Blight", value: 25 },
    { name: "Powdery Mildew", value: 20 },
    { name: "Leaf Spot", value: 15 },
    { name: "Other", value: 5 },
]

const COLORS = ["#0C6837", "#2E8B57", "#3CB371", "#66CDAA", "#8FBC8F"]

const recentDetections = [
    {
        id: 1,
        disease: "Rust",
        plant: "Wheat",
        confidence: 98,
        date: "2023-07-15",
        status: "High Risk",
    },
    {
        id: 2,
        disease: "Blight",
        plant: "Potato",
        confidence: 95,
        date: "2023-07-14",
        status: "High Risk",
    },
    {
        id: 3,
        disease: "Powdery Mildew",
        plant: "Cucumber",
        confidence: 87,
        date: "2023-07-13",
        status: "Medium Risk",
    },
    {
        id: 4,
        disease: "Leaf Spot",
        plant: "Tomato",
        confidence: 82,
        date: "2023-07-12",
        status: "Medium Risk",
    },
    {
        id: 5,
        disease: "Healthy",
        plant: "Corn",
        confidence: 99,
        date: "2023-07-11",
        status: "Healthy",
    },
]

const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Smith",
        product: "Organic Fertilizer",
        amount: 49.99,
        status: "Completed",
    },
    {
        id: "ORD-002",
        customer: "Sarah Johnson",
        product: "Pest Control Kit",
        amount: 79.99,
        status: "Processing",
    },
    {
        id: "ORD-003",
        customer: "Michael Brown",
        product: "Garden Tools Set",
        amount: 129.99,
        status: "Completed",
    },
    {
        id: "ORD-004",
        customer: "Emily Davis",
        product: "Plant Health Monitor",
        amount: 59.99,
        status: "Shipped",
    },
    {
        id: "ORD-005",
        customer: "David Wilson",
        product: "Seed Collection",
        amount: 34.99,
        status: "Processing",
    },
]

export default function Dashboard() {
    const [timeRange, setTimeRange] = useState("week")

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">Overview of your agricultural business</p>
                </div>
                <div className="flex">
                    <Button variant="outline">Download Report</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,543.00</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-500">+12.5%</span> from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-500">+8.2%</span> from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">432</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-red-500">-3.1%</span> from last month
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Disease Detections</CardTitle>
                        <Bug className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,293</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-green-500">+18.7%</span> from last month
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Sales Overview</CardTitle>
                            <CardDescription>Monthly revenue for the current year</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setTimeRange("week")}>
                                Week
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setTimeRange("month")}>
                                Month
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setTimeRange("year")}>
                                Year
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [`$${value}`, "Revenue"]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                    <Bar dataKey="total" fill="#0C6837" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Common Diseases</CardTitle>
                        <CardDescription>Distribution of detected plant diseases</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={diseaseData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {diseaseData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, "Percentage"]}
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "1px solid #e2e8f0",
                                            borderRadius: "0.5rem",
                                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Disease Detections</CardTitle>
                        <CardDescription>Latest plant disease detections by users</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentDetections.map((detection) => (
                                <div key={detection.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-primary/10 p-2">
                                            <Bug className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{detection.disease}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {detection.plant} • {detection.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">{detection.confidence}%</span>
                                        <Badge
                                            variant={
                                                detection.status === "High Risk"
                                                    ? "destructive"
                                                    : detection.status === "Medium Risk"
                                                        ? "default"
                                                        : "outline"
                                            }
                                        >
                                            {detection.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest customer orders and their status</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-full bg-primary/10 p-2">
                                            <ShoppingCart className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{order.product}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.customer} • {order.id}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">${order.amount}</span>
                                        <Badge
                                            variant={
                                                order.status === "Completed"
                                                    ? "outline"
                                                    : order.status === "Processing"
                                                        ? "default"
                                                        : "secondary"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

