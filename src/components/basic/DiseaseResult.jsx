import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, Leaf, Languages } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const MYMEMORY_API = "https://api.mymemory.translated.net/get";

async function translateText(text, targetLang = "ur") {
    if (!text || text.trim() === "") return "";

    try {
        // Build the API URL with query parameters
        const url = new URL(MYMEMORY_API);
        url.searchParams.append("q", text);
        url.searchParams.append("langpair", `en|${targetLang}`);

        // Optional: Add your email for higher usage limits
        // url.searchParams.append("de", "your.email@example.com");

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error("Translation failed");
        }

        const data = await response.json();

        // Check if we got a valid translation
        if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        } else {
            console.warn("Translation warning:", data.responseMessage || "Unknown issue");
            return text; // Return original text as fallback
        }
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Return original text on error
    }
}

export default function DiseaseResult({ isOpen, onClose, diseases }) {
    const [isTranslating, setIsTranslating] = useState(false)
    const [translatedDiseases, setTranslatedDiseases] = useState(null)
    const uniqueDiseases = diseases?.filter((disease) => !disease.redundant)

    const handleTranslate = async () => {
        setIsTranslating(true)
        try {
            const translated = await Promise.all(
                uniqueDiseases.map(async (disease) => {
                    const translatedName = await translateText(disease.name);

                    const translatedDescription = await translateText(disease.details.description);

                    const translatedTreatments = {
                        chemical: await Promise.all(
                            disease.details.treatment.chemical.map(async (t) => {
                                return await translateText(t);
                            }),
                        ),
                        biological: await Promise.all(
                            disease.details.treatment.biological.map(async (t) => {
                                return await translateText(t);
                            }),
                        ),
                        prevention: await Promise.all(
                            disease.details.treatment.prevention.map(async (t) => {
                                return await translateText(t);
                            }),
                        ),
                    }

                    const translatedCause = disease.details.cause
                        ? await translateText(disease.details.cause)
                        : null

                    return {
                        ...disease,
                        name: translatedName,
                        details: {
                            ...disease.details,
                            description: translatedDescription,
                            treatment: translatedTreatments,
                            cause: translatedCause,
                        },
                    }
                }),
            )
            setTranslatedDiseases(translated)
        } catch (error) {
            console.error("Translation error:", error)
        } finally {
            setIsTranslating(false)
        }
    }

    const diseasesToShow = translatedDiseases || uniqueDiseases

    const TranslationLoadingSkeleton = () => (
        <div className="space-y-6 animate-pulse">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-32 bg-muted rounded" />
                            <div className="h-6 w-24 bg-muted rounded" />
                        </div>
                    </div>
                    <div className="h-20 bg-muted rounded" />
                    <div className="space-y-2">
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-4 bg-muted rounded w-full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="flex h-full max-h-[90vh] flex-col overflow-hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5" />
                        Detection Results
                    </DialogTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTranslate}
                        disabled={isTranslating || !!translatedDiseases}
                        className="flex items-center gap-2"
                    >
                        <Languages className="h-4 w-4" />
                        {translatedDiseases ? "Translated" : isTranslating ? "Translating..." : "Translate to Urdu"}
                    </Button>
                </DialogHeader>
                <ScrollArea className="pr-4 h-full pb-8">
                    {isTranslating ? (
                        <TranslationLoadingSkeleton />
                    ) : (
                        <div className="space-y-6">
                            {diseasesToShow?.map((disease) => (
                                <div key={disease.id} className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">{disease.name}</h3>
                                            <Badge variant={disease.probability > 0.9 ? "destructive" : "secondary"}>
                                                {Math.round(disease.probability * 100)}% Confidence
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">{disease.details.description}</p>

                                    {disease.probability > 0.9 && (
                                        <Alert>
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertTitle>High Confidence Detection</AlertTitle>
                                            <AlertDescription>
                                                This disease has been detected with high confidence. Immediate action is recommended.
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <Accordion type="single" collapsible className="w-full">
                                        {disease.details.treatment.chemical && disease.details.treatment.chemical.length > 0 && (
                                            <AccordionItem value="chemical">
                                                <AccordionTrigger>Chemical Treatment</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="ml-4 space-y-2 list-disc">
                                                        {disease.details.treatment.chemical.map((treatment, index) => (
                                                            <li key={index} className="text-sm">
                                                                {treatment}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {disease.details.treatment.biological && disease.details.treatment.biological.length > 0 && (
                                            <AccordionItem value="biological">
                                                <AccordionTrigger>Biological Treatment</AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="ml-4 space-y-2 list-disc">
                                                        {disease.details.treatment.biological.map((treatment, index) => (
                                                            <li key={index} className="text-sm">
                                                                {treatment}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        <AccordionItem value="prevention">
                                            <AccordionTrigger>Prevention Methods</AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="ml-4 space-y-2 list-disc">
                                                    {disease.details.treatment.prevention.map((treatment, index) => (
                                                        <li key={index} className="text-sm">
                                                            {treatment}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    {disease.details.cause && (
                                        <div className="text-sm">
                                            <span className="font-medium">Cause: </span>
                                            {disease.details.cause}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}