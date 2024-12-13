import { EditorView } from 'prosemirror-view';
import { EditorState, Selection, Plugin, PluginKey } from 'prosemirror-state';
import { DEFAULT_CONTINUE_WRITING } from './constants';
import { getTextContentFromNodes, posToOffsetRect } from '../core';
import { getEditable } from '../core/meta';
import { createPortal, getPortal } from '../plugin-portal';
import { AIServiceFactory } from './services';
import type { AIConfig } from './services';

export interface AIOptions {
  config: AIConfig;
  disable?: boolean;
  enableQuickContinueWriting?: boolean;
  enableQuickQuestion?: boolean;
  enableAIChat?: boolean;
  onAIChatOpenChange?: (open: boolean, selection?: Selection) => void;
  onAttachAIChat?: (portal: HTMLElement) => void;
}

export const AIPluginKey = new PluginKey('plugin-ai');

const defaultAIOptions: AIOptions = {
  config: {
    type: 'deepseek',
    apiKey: '',
    model: 'deepseek-chat'
  },
  disable: false,
  enableAIChat: true
};

export function AI(options: AIOptions = defaultAIOptions) {
  const isAIContinueWriting = segments('+', 2);
  const isAIAsking = segments('?', 2);

  options = {
    ...defaultAIOptions,
    ...options
  };

  const aiService = AIServiceFactory.create(options.config);
  let editorView: EditorView | null = null;

  return new Plugin({
    key: AIPluginKey,
    view(view) {
      editorView = view;

      const portal = createPortal(view.state, AIPluginKey);
      options.onAttachAIChat?.(portal);

      return {
        destroy() {
          editorView = null;
        }
      };
    },
    props: {
      handleKeyDown(view, event) {
        if (options.enableAIChat && event.code === 'Space') {
          const selection = view.state.selection;
          const nodeText = getTextContentFromNodes(selection.$from);

          if (nodeText.length === 0) {
            const portal = getPortal(view.state, AIPluginKey);

            if (!portal) {
              return false;
            }

            const rect = posToOffsetRect(view, selection.from, selection.to);

            portal.style.display = 'block';
            portal.style.top = rect.y + 'px';
            portal.style.left = rect.x + 'px';
            portal.style.width = rect.width + 'px';
            portal.style.height = rect.height + 'px';

            options.onAIChatOpenChange?.(true, selection);
            return true;
          }

          return false;
        }
      }
    },
    state: {
      init() {
        return {
          active: false
        };
      },
      apply(transaction, value, oldState, newState) {
        const active = getEditable(transaction);

        if (!transaction.docChanged || !active || !editorView) {
          return value;
        }

        if (options.enableQuickContinueWriting) {
          const text = getPrevText(newState, { chars: 2 });

          if (isAIContinueWriting(text[1]) && text === '++') {
            const question = getPrevText(newState, {
              chars: 5000
            });
            aiService.continueWriting(question).then(result => {
              if (editorView) {
                const { state, dispatch } = editorView;
                const { tr } = state;
                tr.insertText(result);
                dispatch(tr);
              }
            });
          }
        }

        if (options.enableQuickQuestion) {
          const text = getPrevText(newState, { chars: 2 });

          if (isAIAsking(text[1]) && text === '??') {
            const question = getPrevText(newState, {
              chars: 5000
            });
            aiService.chat([
              { role: 'user', content: question }
            ]).then(result => {
              if (editorView) {
                const { state, dispatch } = editorView;
                const { tr } = state;
                tr.insertText(result);
                dispatch(tr);
              }
            });
          }
        }

        return value;
      }
    }
  });
}

function getPrevText(
  state: EditorState,
  {
    chars,
    offset = 0
  }: {
    chars: number;
    offset?: number;
  }
): string {
  const { selection } = state;
  const { empty, from } = selection;

  if (!empty) {
    return '';
  }

  const start = Math.max(0, from - chars);
  const text = state.doc.textBetween(start, from - offset, '\n');

  return text;
}

function segments(token: string, count: number) {
  return (text: string) => {
    if (text.length < count) {
      return false;
    }

    const tokens = text.slice(-count).split('');

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] !== token) {
        return false;
      }
    }

    return true;
  };
}
