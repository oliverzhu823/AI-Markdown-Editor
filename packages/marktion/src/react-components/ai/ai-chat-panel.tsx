import { useRef, useState, useCallback, useEffect } from 'react';
import { Input, Button, Popover, theme } from 'antd';
import { SparklesIcon, SendHorizonalIcon } from 'lucide-react';
import { useChat } from 'ai';
import { usePMRenderer } from '../helper';
import { ChatMessages } from './chat-messages';
import { ChatMenu, ChatMenuProps } from './chat-menu';
import { ChatMenuKey } from './chat-menu';
import { insertMessages } from './utils';
import type { InputRef } from 'antd';
import { AIConfig } from '../../plugin-ai/services/types';

const defaultInitialMessages = [];

export interface AIChatPanelProps extends Omit<Parameters<typeof Popover>[0], 'content'> {
  aiConfig: AIConfig;
  selection?: any;
}

export function AIChatPanel({ children, aiConfig, selection, ...popoverProps }: AIChatPanelProps) {
  const inputRef = useRef<InputRef>(null);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const chatMenuWrapperRef = useRef<HTMLDivElement>(null);
  const { token } = theme.useToken();
  const pm = usePMRenderer();

  const { messages, input, isLoading, handleInputChange, handleSubmit, setMessages, stop } =
    useChat({
      api: '/api/deepseek',
      body: {
        model: aiConfig.model,
        temperature: aiConfig.temperature || 0.7,
        max_tokens: aiConfig.maxTokens || 2000,
        stream: true,
      }
    });

  const [isComposingInput, setIsComposingInput] = useState(false);

  useEffect(() => {
    if (!popoverProps.open) {
      setMessages(defaultInitialMessages);
      stop();
    } else {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [popoverProps.open]);

  useEffect(() => {
    if (!popoverProps.open) {
      setChatMenuOpen(false);
      return;
    }

    if (messages.length >= 2) {
      setChatMenuOpen(true);
    }
  }, [messages.length >= 2, popoverProps.open, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!popoverProps.open) {
      return;
    }

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        popoverProps.onOpenChange?.(false);
        pm.focus();
      }
    };

    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [popoverProps.onOpenChange, popoverProps.open]);

  const onSubmit = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (isComposingInput) return;
    if (e?.shiftKey) return;

    handleSubmit(e as any);
  };

  const onSelectMenu: ChatMenuProps['onSelectMenu'] = useCallback(
    key => {
      if (key === ChatMenuKey.InsertToContent) {
        popoverProps.onOpenChange?.(false);
        insertMessages(pm, messages, selection);
      }
    },
    [pm, messages]
  );

  const inputEl = (
    <Input
      style={{ boxShadow: 'none' }}
      bordered={false}
      value={input}
      disabled={isLoading}
      ref={inputRef}
      prefix={
        <SparklesIcon
          onClick={() => setChatMenuOpen(!chatMenuOpen)}
          style={{
            cursor: 'pointer',
            marginRight: token.marginXS,
            color: token.purple
          }}
        />
      }
      suffix={
        <Button
          loading={isLoading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          icon={<SendHorizonalIcon width={16} height={16} />}
          onClick={onSubmit}
        />
      }
      placeholder={`${aiConfig.type === 'deepseek' ? 'Deepseek' : 'OpenAI'} AI Assistant`}
      onChange={handleInputChange}
      onPressEnter={onSubmit}
      onCompositionStart={() => setIsComposingInput(true)}
      onCompositionEnd={() => setIsComposingInput(false)}
    />
  );

  const renderInputMode = () => {
    return <div style={{ padding: token.paddingXS }}>{inputEl}</div>;
  };

  const renderChatMode = () => {
    return (
      <>
        <div style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
          <ChatMessages messages={messages} />
        </div>
        <div ref={chatMenuWrapperRef} style={{ position: 'relative' }}>
          <ChatMenu
            open={chatMenuOpen}
            onSelectMenu={onSelectMenu}
            getPopupContainer={() => chatMenuWrapperRef.current || document.body}
          >
            <div style={{ padding: token.paddingXS }}>{inputEl}</div>
          </ChatMenu>
        </div>
      </>
    );
  };

  const content = (
    <div
      style={{
        width: 600
      }}
      onWheel={e => {
        e.stopPropagation();
      }}
    >
      {messages.length > 0 ? renderChatMode() : renderInputMode()}
    </div>
  );

  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      arrow={false}
      overlayInnerStyle={{
        padding: 0
      }}
      {...popoverProps}
      content={content}
    >
      {children}
    </Popover>
  );
}
