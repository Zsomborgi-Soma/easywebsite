import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: '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',
});

async function getHaiku() {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Write a haiku about recursion in programming.' },
        ],
    });
    console.log(completion.choices[0].message.content);
}

getHaiku();