import openAI from "./openAI";

const query = async (prompt: string, model: string) => {
  const choice = await openAI
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `Unable to find an answer. Please try again later. Error: ${err.message}`
    );

  return choice;
};

export default query;
