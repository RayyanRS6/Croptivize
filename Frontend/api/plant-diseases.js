// Vercel serverless function. It fetches Perenual's pest and disease list on the
// server, so the API key never reaches the browser.
// Set PERENUAL_API_KEY in the Vercel project's environment variables.
export default async function handler(req, res) {
    const key = process.env.PERENUAL_API_KEY

    if (!key) {
        return res.status(503).json({ message: "Disease library is not configured" })
    }

    try {
        const upstream = await fetch(
            `https://perenual.com/api/pest-disease-list?key=${encodeURIComponent(key)}`
        )

        if (!upstream.ok) {
            return res.status(502).json({ message: "Disease library is unavailable" })
        }

        const body = await upstream.json()

        // Cache at the edge for a day to stay well inside Perenual's free-tier limits.
        res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800")
        return res.status(200).json(body)
    } catch {
        return res.status(502).json({ message: "Disease library is unavailable" })
    }
}
