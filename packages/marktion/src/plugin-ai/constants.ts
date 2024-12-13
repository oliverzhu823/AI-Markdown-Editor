export const DEFAULT_CONTINUE_WRITING =
  'You are an AI writing assistant that continues existing text based on context from prior text. ' +
  'Give more weight/priority to the later characters than the beginning ones. ' +
  'Limit your response to no more than 200 characters, but make sure to construct complete sentences.';

export const DEFAULT_GPT_PROMPT =
  'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.';

export enum MarktionAIEnum {
  TopicWriting,
  ContinueWriting,
  ChangeTone,
  FixSpellingGrammar,
  Translate,
  ExplainThis,
  FindActionItems,
  SimplifyLanguage,
  Summarize,
  ImproveWriting,
  MakeLonger,
  MakeShorter
}

export const DEEPSEEK_MODELS = {
  chat: 'deepseek-chat',
  coder: 'deepseek-coder-6.7b-instruct'
} as const;

export const AI_PROMPTS = {
  [MarktionAIEnum.TopicWriting]: {
    deepseek: '作为一位专业作家，请基于我提供的上下文和主题类型创作内容。注重逻辑性和专业性。',
    openai: 'Act as a writer and write a piece of content based on the context and topic type I provide.'
  },
  [MarktionAIEnum.ContinueWriting]: {
    deepseek: '作为一位创意写作者，请基于提供的上下文继续写作。保持文风一致性，注重内容的连贯性。',
    openai: 'Act as a creative writer and continue writing a story or paragraph based on the context I provide.'
  },
  [MarktionAIEnum.ChangeTone]: {
    deepseek: '请调整以下文字的语气，在保持原意的基础上改变表达方式。',
    openai: 'Act as a tone changer for a given piece of text while ensuring that the meaning remains intact.'
  },
  [MarktionAIEnum.Summarize]: {
    deepseek: '请用简洁的语言总结以下内容的主要观点。',
    openai: 'Act as a summarizer for a longer piece of text.'
  },
  [MarktionAIEnum.ImproveWriting]: {
    deepseek: '作为专业编辑，请帮助改进这段文字，使其更加专业和有说服力。',
    openai: 'Act as an editor and help me improve my writing.'
  },
  [MarktionAIEnum.FixSpellingGrammar]: {
    deepseek: '请检查并修正以下文字中的拼写和语法错误。',
    openai: 'Act as a proofreader for a piece of writing that has spelling and grammar errors.'
  },
  [MarktionAIEnum.Translate]: {
    deepseek: '请将以下内容准确翻译成目标语言，保持原文的语气和风格。',
    openai: 'As a language translator, translate the text to the target language provided.'
  },
  [MarktionAIEnum.ExplainThis]: {
    deepseek: '请用通俗易懂的语言解释以下内容，假设读者没有相关背景知识。',
    openai: 'Explain a complex topic as if I were 18 years old with no prior knowledge.'
  },
  [MarktionAIEnum.FindActionItems]: {
    deepseek: '请从以下内容中提取具体的行动项目和待办事项。',
    openai: 'Extract specific action items and tasks from the following content.'
  },
  [MarktionAIEnum.SimplifyLanguage]: {
    deepseek: '请将以下内容简化，使用更简单直接的语言表达。',
    openai: 'Simplify the following content using more straightforward language.'
  },
  [MarktionAIEnum.MakeLonger]: {
    deepseek: '请扩展以下内容，添加更多细节和解释，但保持主题一致。',
    openai: 'Expand the following content with more details while maintaining the theme.'
  },
  [MarktionAIEnum.MakeShorter]: {
    deepseek: '请精简以下内容，保留核心信息的同时减少字数。',
    openai: 'Condense the following content while retaining the core information.'
  }
} as const;
