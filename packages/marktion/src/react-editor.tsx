import '@radix-ui/themes/styles.css';

import { Button, Card, Flex, Inset, Select, Theme } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { MarktionState, MarktionStateOptions } from './marktion-state';
import { Marktion } from './marktion-refactor';
import { typography } from './react-components/typegraphy';
import { ProseMirror } from './react-components/react-prosemirror';

type ReactEditorProps = MarktionStateOptions & {};

const EDITOR_ROOT_TO_MARKTION = new WeakMap<HTMLDivElement, Marktion>();

export function ReactAIEditor(props: ReactEditorProps) {
  const [mountEl, setMountEl] = useState<HTMLDivElement | null>(null);
  const [marktion, setMarktion] = useState<Marktion | null>(null);
  const [state] = useState(() =>
    MarktionState.create({
      content: props.content
    })
  );

  useEffect(() => {
    if (!mountEl || EDITOR_ROOT_TO_MARKTION.has(mountEl)) return;

    const marktion = new Marktion(state);

    // @ts-ignore
    window['marktion'] = marktion;

    setMarktion(marktion);
    EDITOR_ROOT_TO_MARKTION.set(mountEl, marktion);
  }, [mountEl]);

  return (
    <Theme data-is-root-theme="false">
      <Card>
        <Inset clip="border-box" style={{ position: 'relative' }} pb="current">
          <ProseMirror root={mountEl} state={state.editorState} nodeViews={}>
            <div
              ref={setMountEl}
              style={{
                maxHeight: 600,
                overflowY: 'auto',
                outline: 'none',
                padding:
                  'var(--inset-padding-top) var(--inset-padding-right) var(--inset-padding-bottom) var(--inset-padding-left)'
              }}
            />
          </ProseMirror>
        </Inset>

        <Toolbar />
      </Card>
    </Theme>
  );
}

function Toolbar() {
  return (
    <Flex pt="2" justify="between">
      <Flex gap="3" align="center">
        <Flex align="center" gap="2">
          <Select.Root defaultValue="apple" size="1">
            <Select.Trigger variant="soft">Tone</Select.Trigger>
            <Select.Content>
              <Select.Item value="apple">English</Select.Item>
              <Select.Item value="orange">Chinese</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
      <Button size="1" variant="soft">
        Share
      </Button>
    </Flex>
  );
}
