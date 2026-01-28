const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

async function listAllModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return;

    try {
        const genAI = new GoogleGenerativeAI(key);
        // The listModels method is available on the genAI object returning a promise
        // resulting in a ListModelsResponse
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
        const data = await response.json();

        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found or error in response:", data);
        }
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}

listAllModels();
