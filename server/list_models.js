const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("API Key missing");
        return;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        // The listModels method is available on the genAI instance in newer SDKs
        // If not, we can try to infer it.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Checking model 'gemini-1.5-flash' explicitly...");

        // Let's try a very simple generation to see if it's a versioning issue
        const result = await model.generateContent("test");
        const response = await result.response;
        console.log("Response:", response.text());

    } catch (error) {
        console.error("Error Detail:", error);
    }
}

listModels();
