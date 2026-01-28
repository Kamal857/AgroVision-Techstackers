const OpenAI = require("openai");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

async function testOpenAICrop() {
    const key = process.env.OPENAI_API_KEY;
    console.log("Checking OpenAI API Key:", key ? "Key exists" : "Key MISSING");

    if (!key) return;

    try {
        const openai = new OpenAI({ apiKey: key });

        // Simulating the base64 image conversion from a known test file if possible, or just a dummy request
        console.log("Testing GPT-4o connectivity and JSON response...");
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: "Analyze a hypothetical healthy wheat crop. Return a JSON object with crop name and health status."
                }
            ],
            response_format: { type: "json_object" },
        });

        console.log("Success! OpenAI Result:", response.choices[0].message.content);
    } catch (error) {
        console.error("FAILED to connect to OpenAI:");
        console.error("Error Message:", error.message);
    }
}

testOpenAICrop();
