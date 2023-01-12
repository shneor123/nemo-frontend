import { Configuration, OpenAIApi } from 'openai'
import secret from '../.secret/keys.json'


const configuration = new Configuration({
    apiKey: secret.OPENAI_API_KEY,
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

        var splittingPattern = /[A-Za-z ']+/g
        var filteredResponse = response.data.choices[0].text.match(splittingPattern)
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