const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function testGeminiPro() {
    const key = process.env.GEMINI_API_KEY;
    console.log("Checking API Key:", key ? "Key exists" : "Key MISSING");

    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        console.log("Attempting to generate content with gemini-pro...");
        const result = await model.generateContent("Say 'Hello'");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("FAILED to connect with gemini-pro:");
        console.error("Error Message:", error.message);
    }
}

testGeminiPro();
