const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function testGemini25() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        // Using the exact name from the list
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log("Attempting to generate content with gemini-2.5-flash...");
        const result = await model.generateContent("Hello!");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("FAILED with gemini-2.5-flash:");
        console.error("Error Message:", error.message);
    }
}

testGemini25();
