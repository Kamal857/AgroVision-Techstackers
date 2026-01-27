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

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        console.log("Calling Gemini API with model: gemini-2.5-flash...");

        const prompt = `Analyze this plant/crop image. 
        Identify the following:
        1. Crop Name
        2. Health Status (either "Healthy" or the specific disease name)
        3. Confidence Level (as a percentage)
        4. Symptoms (key things observed in the image)
        5. Treatment (immediate recommended actions)
        6. Prevention (how to prevent this in the future)

        Return the response in strictly JSON format with this structure:
        {
          "crop": "string",
          "health": "string",
          "confidence": "string",
          "symptoms": ["string"],
          "treatment": ["string"],
          "prevention": ["string"]
        }`;

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

        // Parse JSON from text, handling markdown blocks
        let jsonResponse;
        try {
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (parseError) {
            console.error("Failed to parse Gemini response as JSON:", text);
            // Fallback for non-JSON responses
            jsonResponse = {
                crop: "Unknown",
                health: "Analysis Error",
                confidence: "0%",
                symptoms: ["Could not parse response"],
                treatment: ["Please try again"],
                prevention: ["N/A"]
            };
        }

        res.json(jsonResponse);

    } catch (error) {
        console.error("Error in crop detection:", error);
        res.status(500).json({ error: "Failed to process image", details: error.message });
    }
};
