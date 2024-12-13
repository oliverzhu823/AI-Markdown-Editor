export interface AIServiceAdapter {
  chat(messages: Array<{ role: string; content: string }>): Promise<string>;
  continueWriting(context: string): Promise<string>;
  improveWriting(text: string): Promise<string>;
  translate(text: string, targetLang: string): Promise<string>;
  explain(text: string): Promise<string>;
  summarize(text: string): Promise<string>;
}

export interface AIConfig {
  type: 'openai' | 'deepseek';
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
