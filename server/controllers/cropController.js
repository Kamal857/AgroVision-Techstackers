const OpenAI = require("openai");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.detectCrop = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded" });
        }

        // If API Key is missing, return mock response
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key')) {
            return res.json({
                crop: "Wheat (Mock)",
                health: "Healthy",
                disease: "None",
                confidence: "95%",
                careTips: ["Water regularly", "Apply NPK fertilizer"]
            });
        }

        const imagePath = req.file.path;
        const imageData = fs.readFileSync(imagePath);
        const base64Image = Buffer.from(imageData).toString("base64");

        console.log("Calling OpenAI GPT-4o for crop analysis...");

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Analyze this plant/crop image. Identify:
                            1. Crop Name
                            2. Health Status (either "Healthy" or the specific disease name)
                            3. Confidence Level (as a percentage)
                            4. Symptoms (key observations)
                            5. Treatment (actions to take)
                            6. Prevention (future steps)

                            Return ONLY a JSON object with this exact structure:
                            {
                              "crop": "string",
                              "health": "string",
                              "confidence": "string",
                              "symptoms": ["string"],
                              "treatment": ["string"],
                              "prevention": ["string"]
                            }`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${req.file.mimetype};base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
        });

        // Cleanup uploaded file
        fs.unlinkSync(imagePath);

        const result = JSON.parse(response.choices[0].message.content);
        res.json(result);

    } catch (error) {
        console.error("Error in crop detection (OpenAI):", error);
        res.status(500).json({ error: "Analysis failed", details: error.message });
    }
};
