const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function testGemini20() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        console.log("Attempting to generate content with gemini-2.0-flash...");
        const result = await model.generateContent("Hello from AgroVision!");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("FAILED with gemini-2.0-flash:");
        console.error("Error Message:", error.message);
    }
}

testGemini20();
