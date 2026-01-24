const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.detectCrop = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded" });
        }

        // If API Key is missing, return mock response (for development without key)
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            return res.json({
                crop: "Wheat (Mock)",
                health: "Healthy",
                disease: "None",
                confidence: "95%",
                careTips: [
                    "Water regularly",
                    "Apply NPK fertilizer",
                    "Monitor for rust"
                ]
            });
        }

        // Convert file to base64
        const imagePath = req.file.path;
        const imageData = fs.readFileSync(imagePath);
        const base64Image = Buffer.from(imageData).toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Analyze this crop image. Identify the crop name, its health status (Healthy/Disease Name), confidence level, and providing 3 bullet points for care tips or cure if diseased. Return the response in strictly JSON format like: { \"crop\": \"string\", \"health\": \"string\", \"disease\": \"string\", \"confidence\": \"string\", \"careTips\": [\"string\"] }";

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: req.file.mimetype,
                },
            },
        ]);

        const response = await result.response;
        const text = response.text();

        // Cleanup uploaded file
        fs.unlinkSync(imagePath);

        // Parse JSON from markdown code block if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '');
        const jsonResponse = JSON.parse(cleanText);

        res.json(jsonResponse);

    } catch (error) {
        console.error("Error in crop detection:", error);
        res.status(500).json({ error: "Failed to process image", details: error.message });
    }
};
