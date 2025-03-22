exports.handler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey: process.env.GEMINI_API_KEY }),
    };
  };
  