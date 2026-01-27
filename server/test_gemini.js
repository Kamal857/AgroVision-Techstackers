const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

    for (const modelName of models) {
        try {
            console.log(`\n--- Testing model: ${modelName} ---`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Keep it short. Say OK if you can hear me.");
            const response = await result.response;
            console.log(`✅ ${modelName} works! Response:`, response.text().trim());
            return; // Exit if one works
        } catch (error) {
            console.error(`❌ ${modelName} failed:`, error.status || error.message);
        }
    }
    console.log("\n❌ All models failed. Check API key or project-wide access.");
}

testGemini();
