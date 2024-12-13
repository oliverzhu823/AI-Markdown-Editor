import { AIServiceAdapter, AIConfig } from './types';
import { DeepseekService } from './deepseek';

export class AIServiceFactory {
  static create(config: AIConfig): AIServiceAdapter {
    switch (config.type) {
      case 'deepseek':
        return new DeepseekService(config);
      default:
        throw new Error(`Unsupported AI service: ${config.type}`);
    }
  }
}
