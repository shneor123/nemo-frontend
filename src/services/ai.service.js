import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = "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"


const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
})

async function getAiTextCompletion(sttInput) {
    const openai = new OpenAIApi(configuration)
    try {
        const response = await openai
            .createCompletion(
                "text-davinci-002",
                {
                    prompt: `build a to-do list for ${sttInput} \n`,
                    temperature: 1,
                    max_tokens: 311,
                    top_p: 0.3,
                    frequency_penalty: 0.5,
                    presence_penalty: 0,
                })

        const splittingPattern = /[A-Za-z ]+/g
        const filteredResponse = response.data.choices[0].text.match(splittingPattern)
     
        return {
            checklistTitle: sttInput,
            todoTitles: filteredResponse
        }

    } catch (err) {
        console.log('could not get a response from GPT-3', err)
    }
}
export const aiService = {
    getAiTextCompletion
}
