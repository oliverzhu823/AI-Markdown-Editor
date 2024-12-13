import { AIServiceAdapter, AIMessage } from './types';
import { retryWithBackoff } from './error';

export class DeepseekService implements AIServiceAdapter {
  private async makeRequest(messages: AIMessage[]): Promise<string> {
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: 'deepseek-chat',
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async chat(messages: AIMessage[]): Promise<string> {
    return retryWithBackoff(() => this.makeRequest(messages));
  }

  async continueWriting(context: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful writing assistant. Continue the text in a natural and coherent way.',
      },
      {
        role: 'user',
        content: `Please continue writing the following text:\n\n${context}`,
      },
    ];
    return this.chat(messages);
  }

  async improveWriting(text: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a writing improvement assistant. Enhance the given text while maintaining its core meaning.',
      },
      {
        role: 'user',
        content: `Please improve this text:\n\n${text}`,
      },
    ];
    return this.chat(messages);
  }

  async translate(text: string, targetLang: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: `You are a translation assistant. Translate the given text to ${targetLang}.`,
      },
      {
        role: 'user',
        content: `Translate this text to ${targetLang}:\n\n${text}`,
      },
    ];
    return this.chat(messages);
  }

  async explain(text: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are an explanation assistant. Explain the given text clearly and concisely.',
      },
      {
        role: 'user',
        content: `Please explain this text:\n\n${text}`,
      },
    ];
    return this.chat(messages);
  }

  async summarize(text: string): Promise<string> {
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: 'You are a summarization assistant. Provide a concise summary of the given text.',
      },
      {
        role: 'user',
        content: `Please summarize this text:\n\n${text}`,
      },
    ];
    return this.chat(messages);
  }
}
