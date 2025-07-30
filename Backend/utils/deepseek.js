import "dotenv/config";
import { get } from "mongoose";

const getdeepseekApiResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:8080",
      "X-Title": "MyGPT",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );
    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {
    console.log(err);
  }
};

export default getdeepseekApiResponse;
