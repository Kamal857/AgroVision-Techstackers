const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askAgronomist = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const systemPrompt = "You are a professional Agronomist Expert specializing in sustainable farming, soil health, crop management, and irrigation. Provide scientific yet easy-to-understand advice for farmers. Stay focused on agricultural topics. If asked about non-farming topics, politely redirect to farming.";

        const fullMessage = `${systemPrompt}\n\nUser Question: ${message}`;
        const result = await chat.sendMessage(fullMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Error in AI Agronomist:", error);
        res.status(500).json({ error: "Failed to get advice from agronomist", details: error.message });
    }
};
