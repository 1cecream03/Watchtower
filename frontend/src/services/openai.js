const OPENAI_API_KEY = //need figure out another way
const OPENAI_BASE_URL = "https://api.openai.com/v1"

export async function getChatGPTRecommendation(prompt) {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        if (!response.ok) {
            const errorText = await response.text(); // Get full error body
            throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
        }

    }

    const data = await response.json();
    return data.choices[0].message.content;
}
