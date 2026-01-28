const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.askAgronomist = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const systemPrompt = "You are a professional Agronomist Expert specializing in sustainable farming, soil health, crop management, and irrigation. Provide scientific yet easy-to-understand advice for farmers. Stay focused on agricultural topics. If asked about non-farming topics, politely redirect to farming.";

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                ...(history || []).map(h => ({
                    role: h.role === 'user' ? 'user' : 'assistant',
                    content: h.parts[0].text
                })),
                { role: "user", content: message }
            ],
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error("Error in AI Agronomist (OpenAI):", error);
        res.status(500).json({ error: "Failed to get advice", details: error.message });
    }
};
