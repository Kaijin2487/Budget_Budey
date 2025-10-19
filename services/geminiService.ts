
import { GoogleGenAI } from "@google/genai";
import type { Transaction, FixedExpense } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getFinancialAdvice = async (transactions: Transaction[], fixedExpenses: FixedExpense[]): Promise<string> => {
  const transactionSummary = transactions.map(t => 
    `${t.date}: ${t.type} - ${t.description} (${t.category}) - ₹${t.amount.toLocaleString()}`
  ).join('\n');

  const fixedExpenseSummary = fixedExpenses.map(fe =>
    `Due on Day ${fe.dueDate}: ${fe.description} - ₹${fe.amount.toLocaleString()}`
  ).join('\n');

  const prompt = `
    Based on the following financial data, provide some actionable insights.
    
    Recent Transactions:
    ${transactionSummary}

    Fixed Monthly Expenses:
    ${fixedExpenseSummary}

    Please provide:
    1. A brief overview of spending patterns.
    2. The top 3 spending categories with specific suggestions to reduce costs.
    3. One practical savings tip suitable for someone with irregular income.
    4. One simple, beginner-friendly investment idea.
    Format the response in clear, concise markdown.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: `You are FinCoach AI, a friendly and insightful financial coach for individuals with irregular income. Your goal is to help users understand their spending, save money, and make smart financial decisions. Provide actionable, concise, and encouraging advice. Avoid jargon. Do not present yourself as a certified financial advisor.`,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "I'm sorry, I couldn't fetch your financial advice right now. Please check your connection or API key and try again.";
  }
};
