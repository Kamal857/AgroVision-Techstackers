const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function testGemini() {
    const key = process.env.GEMINI_API_KEY;
    console.log("Checking API Key:", key ? "Key exists" : "Key MISSING");

    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Attempting to generate content with gemini-1.5-flash...");
        const result = await model.generateContent("Say 'Hello AgroVision' if you can hear me.");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("FAILED to connect to Gemini:");
        console.error("Error Message:", error.message);
        if (error.response) {
            console.error("Response Data:", error.response.data);
        }
    }
}

testGemini();
