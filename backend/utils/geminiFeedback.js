const axios = require("axios");

const generateAIFeedback = async (
  score,
  missingKeywords,
  matchedKeywords
) => {

  try {

    const prompt = `
You are an ATS Resume Expert.

ATS Score: ${score}

Matched Skills:
${matchedKeywords.join(", ")}

Missing Skills:
${missingKeywords.join(", ")}

Provide concise ATS-focused suggestions.

Mention:
1. Missing technical skills
2. Resume improvements
3. Project recommendations
4. Career advice

Keep response in bullet points.

Keep response concise.
`;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model:
          "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"
        }
      }

    );

    return response.data
      .choices[0]
      .message.content;

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

   return `
• Improve skills related to:
${missingKeywords.join(", ")}

• Add stronger projects aligned with the target role

• Improve ATS keyword optimization

• Highlight measurable achievements
`;

  }

};

module.exports =
  generateAIFeedback;