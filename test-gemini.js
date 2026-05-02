import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAT8FeqNkWgtbi1T0fNcxoyopmI4LAJBhE';
const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Hi');
    console.log("gemini-pro worked:", result.response.text());
  } catch (e) {
    console.error("gemini-pro failed:", e.message);
  }
}

test();
