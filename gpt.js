import OpenAI from 'openai';
import 'dotenv/config'

const { GPT_SECRET, OPENAI_ORG } = process.env;
const openai = new OpenAI({ apiKey: GPT_SECRET });

const gpt = async (headline, company) => {
    const reqBody = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", content: "Only respond with a number between 1-100 detailing the impact of the news headline on the stock price of the company. 1 being the least impactful and 100 being the most impactful to a stock's trading price. I will be using this number to decide if I should place a stock trade. If the number is above 70, it should be a stock to consider buying. If the number is above 80, there should be high probability that buying the stock will return a minimum 40% profit. so there needs to be a high confidence in the number."
            },
            {
                role: "user", content: `Given the headline ${headline}, show me the impact on the stock price of ${company} on a scale of 1-100. This number will be used by a day trading algorithm to decide if it should buy the stock.`
            }
        ],
    }


    let completionObj = await openai.chat.completions.create(reqBody)
    let resContent = await  completionObj.choices[0].message.content
    await console.log(resContent)
    return resContent
}


export { gpt }

