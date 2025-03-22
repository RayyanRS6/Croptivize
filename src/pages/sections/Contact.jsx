import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate form submission
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Message sent successfully!")
            // Reset form
            const form = e.target
            form.reset()
        } catch (error) {
            toast.error("Failed to send message")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-2 py-8 md:py-12">
            <div className="mx-auto max-w-[58rem] text-center">
                <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have questions? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
                </p>
            </div>

            <div className="mx-auto flex flex-col-reverse gap-6 lg:gap-8 mt-8 max-w-3xl">
                {/* FAQs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`faq-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                {/* Contact Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we&apos;ll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <Input id="name" placeholder="Enter your name" required disabled={isLoading} />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input id="email" type="email" placeholder="Enter your email" required disabled={isLoading} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="Enter subject" required disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Enter your message" required disabled={isLoading} rows={8} />
                                </div>
                                <div className="w-full flex justify-end">
                                    <Button disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const faqs = [
    {
        question: "How accurate is the disease detection?",
        answer:
            "Our AI-powered disease detection system has an accuracy rate of over 95% for most common plant diseases. The system is continuously learning and improving.",
    },
    {
        question: "What types of plants can be diagnosed?",
        answer:
            "We support a wide range of crops and plants including wheat, rice, corn, tomatoes, potatoes, and many more. Our database is constantly expanding.",
    },
    {
        question: "How long does it take to get results?",
        answer:
            "Disease detection results are typically available within seconds of uploading an image. Detailed recommendations follow shortly after.",
    },
    {
        question: "Do you offer technical support?",
        answer:
            "Yes, we provide technical support via email and phone during business hours. Premium users get access to 24/7 priority support.",
    },
]

